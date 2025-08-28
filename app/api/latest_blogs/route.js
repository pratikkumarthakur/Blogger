import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await connectDB();
};

LoadDB();

export async function GET(request) {
  try {
    console.log("Fetching latest articles with current schema");

    const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 6;
    const exclude = request.nextUrl.searchParams.get("exclude");

    // Simple query without status filter since it doesn't exist in your schema
    let query = {};
    if (exclude) {
      query._id = { $ne: exclude };
    }

    console.log("Query:", query);

    // Select fields that actually exist in your schema including image
    const latestArticles = await BlogModel.find(query)
      .select("title category createdAt author image _id") // Include image field
      .sort({ createdAt: -1 }) // Use createdAt from timestamps
      .limit(limit);

    console.log("Found articles:", latestArticles.length);

    return NextResponse.json({
      success: true,
      blogs: latestArticles,
      total: latestArticles.length,
      message: "Latest articles fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching latest articles:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch latest articles",
        blogs: [],
        debug: error.message,
      },
      { status: 500 }
    );
  }
}
