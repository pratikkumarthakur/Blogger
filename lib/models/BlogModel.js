import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    authorImage: {
      type: String,
      default: "/default-author.png",
    },
    // Add missing fields that your API expects
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },
    views: {
      type: Number,
      default: 0,
    },
    readingTime: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
      },
    ],
    slug: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
    lastViewed: {
      type: Date,
    },
  },
  { timestamps: true } // This creates createdAt and updatedAt automatically
);

const BlogModel = mongoose.models.blog || mongoose.model("blog", Schema);

export default BlogModel;
