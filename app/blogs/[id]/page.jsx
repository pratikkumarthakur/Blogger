// File location: pages/blogs/[id].js (for Pages Router)
// OR app/blogs/[id]/page.js (for App Router)

"use client";

// import { useRouter } from 'next/router'; // For Pages Router
import { useParams } from "next/navigation"; // For App Router
import { useEffect, useState } from "react";
import { blog_data } from "@/Assests/assets";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const page = () => {
  // const router = useRouter();
  // const { id } = router.query; // For Pages Router
  const { id } = useParams(); // For App Router

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch single blog post
  const fetchBlog = async (blogId) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/blog/${blogId}`);
      setBlog(response.data.blog);
      setError(null);
    } catch (err) {
      console.error("Error fetching blog:", err);
      setError("Blog post not found");

      // Fallback to static data if API fails
      const staticBlog = blog_data.find((item) => item.id === blogId);
      if (staticBlog) {
        setBlog(staticBlog);
        setError(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlog(id);
    }
  }, [id]);

  // Color mapping for categories (same as in Blogitem)
  const getCategoryColor = (category) => {
    const colorMap = {
      Technology: "bg-blue-500",
      Lifestyle: "bg-green-500",
      Travel: "bg-purple-500",
      "Food & Recipes": "bg-orange-500",
      Business: "bg-gray-700",
      "Health & Fitness": "bg-red-400",
      Education: "bg-indigo-500",
      Entertainment: "bg-pink-500",
      Finance: "bg-emerald-600",
      Sports: "bg-yellow-600",
      default: "bg-gray-700",
    };
    return colorMap[category] || colorMap.default;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Article Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-5 md:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Articles
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-5 md:px-8 py-12">
        {/* Category Badge */}
        <div className="mb-6">
          <span
            className={`${getCategoryColor(
              blog.category
            )} text-white text-sm font-semibold py-2 px-4 rounded-full`}
          >
            {blog.category}
          </span>
        </div>

        {/* Article Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          {blog.title}
        </h1>

        {/* Article Meta */}
        <div className="flex items-center text-gray-600 mb-8 space-x-4">
          {blog.author && (
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              {blog.author}
            </span>
          )}
          {blog.date && (
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {new Date(blog.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
          {blog.readTime && (
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              {blog.readTime} min read
            </span>
          )}
        </div>

        {/* Featured Image */}
        {blog.image && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={blog.image}
              alt={blog.title}
              width={800}
              height={400}
              className="w-full h-[400px] object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {blog.content ? (
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          ) : (
            <div className="text-gray-700 leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: blog.description }} />
              <p className="mt-6 text-gray-600 italic">
                This is a preview of the article. The full content would be
                displayed here when fetched from your blog API or database.
              </p>
            </div>
          )}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Share this article</h3>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: blog.title,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              Share
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }}
              className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              Copy Link
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default page;
