// File location: pages/blogs/[id].js (for Pages Router)
// OR app/blogs/[id]/page.js (for App Router)

"use client";
<<<<<<< HEAD
import { assets } from "@/Assests/assets";
import Footer from "@/Components/Footer";
import axios from "axios";
=======

// import { useRouter } from 'next/router'; // For Pages Router
import { useParams } from "next/navigation"; // For App Router
import { useEffect, useState } from "react";
import { blog_data } from "@/Assests/assets";
>>>>>>> mobile
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

<<<<<<< HEAD
const page = ({ params }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        // Await params directly in the effect
        const resolvedParams = await params;

        if (!resolvedParams?.id) {
          setError("No blog ID provided");
          setLoading(false);
          return;
        }

        console.log("Fetching blog with ID:", resolvedParams.id);

        const response = await axios.get("/api/blog", {
          params: { id: resolvedParams.id },
        });

        console.log("API Response:", response.data);

        if (response.data.success && response.data.blog) {
          setData(response.data.blog);
          console.log("Blog data set:", response.data.blog);
        } else {
          console.error("Blog not found or API error:", response.data);
          setError(response.data.error || "Blog post not found");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        if (err.response?.status === 404) {
          setError("Blog post not found");
        } else if (err.response?.data?.error) {
          setError(err.response.data.error);
        } else {
          setError("Failed to load blog post");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []); // Empty dependency array - runs once on mount

  // Handle image error
  const handleImageError = (e) => {
    console.error("Image failed to load:", data?.image);
    setImageError(true);
  };

  // Debug data structure
  useEffect(() => {
    if (data) {
      console.log("Blog data debug:", {
        title: data.title,
        readingTime: data.readingTime,
        readingTimeType: typeof data.readingTime,
        views: data.views,
        viewsType: typeof data.views,
        tags: data.tags,
        tagsType: typeof data.tags,
        allKeys: Object.keys(data),
        fullData: data,
      });
    }
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading article...</p>
=======
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
>>>>>>> mobile
        </div>
      </div>
    );
  }

<<<<<<< HEAD
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="mb-4">
            <svg
              className="mx-auto h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-lg text-gray-600 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="mb-4">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Article not found
          </h1>
          <p className="text-gray-600 mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
=======
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
>>>>>>> mobile
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <>
      {/* Header Section - Made smaller */}
      <div className="bg-gray-200 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo} // ensure this is imported or in /public
              width={100}
              height={100}
              alt="Logo"
              className="w-[100px] sm:w-[100px] mt-[15px]" // fixed invalid Tailwind
              priority
            />
          </Link>

          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000] hover:shadow-[-5px_5px_0px_#000000] transition-all">
            Get Started
            <Image src={assets.arrow} width={16} height={16} alt="Arrow" />
          </button>
        </div>

        <div className="text-center my-16">
          <h1 className="text-2xl sm:text-4xl font-semibold max-w-[700px] mx-auto leading-tight">
            {data?.title || "Blog Title"}
          </h1>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-gray-600 mb-10">
            <p className="text-lg">
              By{" "}
              <span className="font-medium text-gray-800 ">
                {data?.author || "Unknown Author"}
              </span>
            </p>

            {data?.createdAt && (
              <div className="flex items-center gap-2 text-sm">
                <span className="hidden sm:inline">•</span>
                <span>
                  {new Date(data.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}

            {data?.readingTime && (
              <>
                <span className="hidden sm:inline">•</span>
                <p className="text-sm">{data.readingTime} min read</p>
              </>
            )}

            {data?.views !== undefined && data?.views !== null && (
              <>
                <span className="hidden sm:inline">•</span>
                <p className="text-sm">
                  {data.views} {data.views === 1 ? "view" : "views"}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-5 max-w-[600px] md:mx-auto mt-[80px] mb-10">
        {/* Featured Image */}
        {data.image && !imageError ? (
          <div className="relative">
            <Image
              className="border-4 border-white rounded-full shadow-lg w-[50%] mx-auto"
              src={data.image}
              width={500}
              height={500}
              alt={data.title || "Blog image"}
              priority
              onError={handleImageError}
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          // Fallback image placeholder
          <div
            className="border-4 border-white bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg flex items-center justify-center"
            style={{ width: "100%", height: "400px" }}
          >
            <div className="text-center text-gray-500">
              <svg
                className="mx-auto h-16 w-16 mb-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm">Image not available</p>
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          {data.category && (
            <div className="mb-6">
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide">
                {data.category}
              </span>
            </div>
          )}

          {data.description ? (
            <div
              className="blog-content prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          ) : (
            <div className="blog-content prose prose-lg max-w-none">
              <p className="text-gray-500 italic text-center py-8">
                No content available for this article.
              </p>
            </div>
          )}

          {/* Tags */}
          {data.tags && Array.isArray(data.tags) && data.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                Tags:
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Social Share */}
        <div className="my-16 text-center">
          <p className="text-black font-semibold mb-6 text-lg">
            Share this article
          </p>
          <div className="flex justify-center gap-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:scale-110 transition-transform block"
            >
              <Image
                src={assets.facebook_icon}
                width={50}
                height={50}
                alt="Share on Facebook"
                className="rounded-lg shadow-md hover:shadow-lg transition-shadow"
              />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                data?.title || "Check out this article"
              )}&url=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:scale-110 transition-transform block"
            >
              <Image
                src={assets.twitter_icon}
                width={50}
                height={50}
                alt="Share on Twitter"
                className="rounded-lg shadow-md hover:shadow-lg transition-shadow"
              />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:scale-110 transition-transform block"
            >
              <Image
                src={assets.googleplus_icon}
                width={50}
                height={50}
                alt="Share on LinkedIn"
                className="rounded-lg shadow-md hover:shadow-lg transition-shadow"
              />
            </a>
          </div>

          {/* Copy URL Button */}
          <div className="mt-6">
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Article URL copied to clipboard!");
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy Link
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
=======
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
>>>>>>> mobile
  );
};

export default page;
