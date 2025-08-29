import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

const LoadDB = async () => {
  await connectDB();
};

LoadDB();

// API endpoints to get all health blogs
export async function GET(request) {
  try {
    const blogId = request.nextUrl.searchParams.get("id");
    const category = request.nextUrl.searchParams.get("category");
    const author = request.nextUrl.searchParams.get("author");
    const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 0;
    const page = parseInt(request.nextUrl.searchParams.get("page")) || 1;

    if (blogId) {
      // Get specific blog by ID
      const blog = await BlogModel.findById(blogId);
      if (!blog) {
        return NextResponse.json(
          {
            success: false,
            error: "Health article not found",
            blog: null,
          },
          { status: 404 }
        );
      }

      // Increment view count
      await BlogModel.findByIdAndUpdate(blogId, {
        $inc: { views: 1 },
        lastViewed: new Date(),
      });

      return NextResponse.json({
        success: true,
        blog: blog,
        message: "Blog fetched successfully",
      });
    } else {
      // Build query filters
      let query = {};
      if (category && category !== "all") {
        query.category = category;
      }
      if (author) {
        query.author = { $regex: author, $options: "i" };
      }

      // Get filtered blogs with pagination
      const skip = (page - 1) * limit;
      const blogsQuery = BlogModel.find(query).sort({ createdAt: -1 });

      if (limit > 0) {
        blogsQuery.skip(skip).limit(limit);
      }

      const blogs = await blogsQuery;
      const totalBlogs = await BlogModel.countDocuments(query);

      // Calculate analytics
      const totalViews = await BlogModel.aggregate([
        { $group: { _id: null, totalViews: { $sum: "$views" } } },
      ]);

      const categoryStats = await BlogModel.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
            totalViews: { $sum: "$views" },
          },
        },
        { $sort: { count: -1 } },
      ]);

      const authorStats = await BlogModel.aggregate([
        {
          $group: {
            _id: "$author",
            count: { $sum: 1 },
            totalViews: { $sum: "$views" },
          },
        },
        { $sort: { count: -1 } },
      ]);

      // Recent activity (last 7 days)
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const recentBlogs = await BlogModel.countDocuments({
        createdAt: { $gte: weekAgo },
      });

      return NextResponse.json({
        success: true,
        blogs,
        pagination: {
          currentPage: page,
          totalPages: limit > 0 ? Math.ceil(totalBlogs / limit) : 1,
          totalBlogs,
          hasNext: limit > 0 ? page * limit < totalBlogs : false,
          hasPrev: page > 1,
        },
        analytics: {
          totalBlogs,
          totalViews: totalViews[0]?.totalViews || 0,
          recentBlogs,
          categoryStats,
          authorStats: authorStats.slice(0, 5), // Top 5 authors
          topCategories: categoryStats.slice(0, 5),
        },
      });
    }
  } catch (error) {
    console.error("Error fetching health articles:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch health articles",
        blog: null,
      },
      { status: 500 }
    );
  }
}

// API Endpoints for uploading Health Articles
export async function POST(request) {
  try {
    const formData = await request.formData();
    console.log("Health article form data:", Array.from(formData.entries()));

    const timestamp = Date.now();
    const image = formData.get("image");
    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const author = formData.get("author");

    // Validate required fields
    if (!title || !description || !category || !author) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please fill in all required fields (title, description, category, author)",
        },
        { status: 400 }
      );
    }

    let imgUrl = "/default-article.png"; // Default fallback image

    if (image && image.size > 0) {
      // Validate image type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(image.type)) {
        return NextResponse.json(
          {
            success: false,
            error: "Please upload a valid image file (JPEG, PNG, or WebP)",
          },
          { status: 400 }
        );
      }

      // Validate image size (max 5MB)
      if (image.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          {
            success: false,
            error: "Image size should be less than 5MB",
          },
          { status: 400 }
        );
      }

      try {
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);

        // Create secure filename
        const fileExtension = path.extname(image.name);
        const safeFileName = `health_article_${timestamp}${fileExtension}`;
        const imagePath = `./public/uploads/${safeFileName}`;

        // Ensure uploads directory exists
        const uploadsDir = "./public/uploads";
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        await writeFile(imagePath, buffer);
        imgUrl = `/uploads/${safeFileName}`;
        console.log("Image saved successfully:", imgUrl);
      } catch (imageError) {
        console.error("Error saving image:", imageError);
        // Continue with default image if upload fails
      }
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim("-");

    const blogData = {
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      author: author.trim(),
      image: imgUrl,
      authorImage: formData.get("authorImage") || "/default-author.png",
      slug: slug,
      views: 0,
      likes: 0,
      status: "published",
      featured: formData.get("featured") === "true",
      tags: formData.get("tags")
        ? formData
            .get("tags")
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
        : [],
      readingTime: Math.ceil(description.split(" ").length / 200), // Estimated reading time
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newBlog = await BlogModel.create(blogData);
    console.log("Health article saved:", newBlog.title);

    return NextResponse.json({
      success: true,
      message: "Health article published successfully! 🌟",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Error creating health article:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to publish health article. Please try again.",
      },
      { status: 500 }
    );
  }
}

// API endpoint to update health articles
export async function PUT(request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Article ID is required",
        },
        { status: 400 }
      );
    }

    const existingBlog = await BlogModel.findById(id);
    if (!existingBlog) {
      return NextResponse.json(
        {
          success: false,
          error: "Health article not found",
        },
        { status: 404 }
      );
    }

    const updateData = {
      updatedAt: new Date(),
    };

    // Update fields if provided
    if (formData.get("title")) {
      updateData.title = formData.get("title").trim();
      updateData.slug = updateData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim("-");
    }

    if (formData.get("description")) {
      updateData.description = formData.get("description").trim();
      updateData.readingTime = Math.ceil(
        updateData.description.split(" ").length / 200
      );
    }

    if (formData.get("category"))
      updateData.category = formData.get("category").trim();
    if (formData.get("author"))
      updateData.author = formData.get("author").trim();
    if (formData.get("status")) updateData.status = formData.get("status");
    if (formData.get("featured"))
      updateData.featured = formData.get("featured") === "true";
    if (formData.get("tags")) {
      updateData.tags = formData
        .get("tags")
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
    }

    // Handle new image upload
    const newImage = formData.get("image");
    if (newImage && newImage.size > 0) {
      try {
        // Delete old image (but keep default images)
        if (
          existingBlog.image &&
          existingBlog.image !== "/default-article.png" &&
          existingBlog.image.startsWith("/uploads/")
        ) {
          const oldImagePath = `./public${existingBlog.image}`;
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }

        // Upload new image
        const timestamp = Date.now();
        const imageByteData = await newImage.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        const fileExtension = path.extname(newImage.name);
        const safeFileName = `health_article_${timestamp}${fileExtension}`;
        const imagePath = `./public/uploads/${safeFileName}`;

        await writeFile(imagePath, buffer);
        updateData.image = `/uploads/${safeFileName}`;
      } catch (imageError) {
        console.error("Error updating image:", imageError);
        // Continue without updating image if upload fails
      }
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      message: "Health article updated successfully! ✨",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating health article:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update health article",
      },
      { status: 500 }
    );
  }
}

// API endpoint to delete health articles
export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Article ID is required",
        },
        { status: 400 }
      );
    }

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          error: "Health article not found",
        },
        { status: 404 }
      );
    }

    // Delete associated image file (but keep default images)
    if (
      blog.image &&
      blog.image !== "/default-article.png" &&
      blog.image.startsWith("/uploads/")
    ) {
      const imagePath = `./public${blog.image}`;
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) console.error("Error deleting image file:", err);
        });
      }
    }

    await BlogModel.findByIdAndDelete(id);
    console.log("Health article deleted:", blog.title);

    return NextResponse.json({
      success: true,
      message: "Health article deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting health article:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete health article",
      },
      { status: 500 }
    );
  }
}
