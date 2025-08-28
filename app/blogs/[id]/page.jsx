"use client";
import { assets } from "@/Assests/assets";
import Footer from "@/Components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const [data, setData] = useState(null);
  const [latestArticles, setLatestArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [latestArticlesLoading, setLatestArticlesLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
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

          // Fetch latest articles excluding current article
          fetchLatestArticles(resolvedParams.id);
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
  }, []);

  // Fetch latest articles with dynamic API call
  const fetchLatestArticles = async (excludeId = null) => {
    try {
      setLatestArticlesLoading(true);

      const params = { limit: 6 };
      if (excludeId) {
        params.exclude = excludeId;
      }

      const response = await axios.get("/api/latest_blogs", { params });

      if (response.data.success && response.data.blogs) {
        console.log("Latest articles fetched:", response.data.blogs);
        setLatestArticles(response.data.blogs);
      } else {
        console.error("Error fetching latest articles:", response.data);
        // Set fallback data only if API completely fails
        setLatestArticles([]);
      }
    } catch (error) {
      console.error("Error fetching latest articles:", error);
    } finally {
      setLatestArticlesLoading(false);
    }
  };

  const handleImageError = (e) => {
    console.error("Image failed to load:", data?.image);
    setImageError(true);
  };

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
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-10 opacity-50">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-gradient-to-r from-purple-400 via-pink-500 to-red-500 border-t-transparent mx-auto"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-2 border-purple-300 opacity-20"></div>
            </div>
            <p className="mt-6 text-xl font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Loading your story...
            </p>
            <div className="mt-4 w-64 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-pink-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-10 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-float-delayed"></div>
          </div>
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto p-8 backdrop-blur-sm bg-white/80 rounded-2xl shadow-2xl border border-white/20">
            <div className="mb-6">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                <svg
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-lg text-gray-600 mb-8">{error}</p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
            }
          }
          @keyframes float-delayed {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-30px) rotate(-180deg);
            }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float-delayed 8s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-10 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          </div>
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto p-8 backdrop-blur-sm bg-white/80 rounded-2xl shadow-2xl border border-white/20">
            <div className="mb-6">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-gray-400 to-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="h-10 w-10 text-white"
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
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-blue-600 bg-clip-text text-transparent mb-4">
              Article not found
            </h1>
            <p className="text-gray-600 mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-blue-600 text-white font-medium rounded-xl hover:from-gray-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background with Side Animations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>

        {/* Left Side Animations */}
        <div className="absolute left-0 top-0 h-full w-32 opacity-40">
          <div className="absolute top-20 -left-8 w-16 h-16 bg-purple-300 rounded-full animate-slide-vertical"></div>
          <div className="absolute top-1/3 -left-4 w-12 h-12 bg-pink-400 rounded-full animate-slide-vertical animation-delay-2000"></div>
          <div className="absolute top-2/3 -left-6 w-14 h-14 bg-blue-300 rounded-full animate-slide-vertical animation-delay-4000"></div>
          <div className="absolute bottom-32 -left-2 w-10 h-10 bg-yellow-300 rounded-full animate-slide-vertical animation-delay-6000"></div>
        </div>

        {/* Right Side Animations */}
        <div className="absolute right-0 top-0 h-full w-32 opacity-40">
          <div className="absolute top-32 -right-8 w-18 h-18 bg-indigo-300 rounded-full animate-slide-vertical-reverse"></div>
          <div className="absolute top-1/2 -right-4 w-14 h-14 bg-rose-400 rounded-full animate-slide-vertical-reverse animation-delay-3000"></div>
          <div className="absolute top-3/4 -right-6 w-16 h-16 bg-teal-300 rounded-full animate-slide-vertical-reverse animation-delay-5000"></div>
          <div className="absolute bottom-20 -right-2 w-12 h-12 bg-amber-300 rounded-full animate-slide-vertical-reverse animation-delay-1000"></div>
        </div>

        {/* Central Background Blobs */}
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          <div className="absolute top-3/4 right-1/3 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-6000"></div>
        </div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 backdrop-blur-sm bg-gradient-to-b from-white/80 to-transparent px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="transform hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={assets.logo}
              width={100}
              height={100}
              alt="Logo"
              className="w-[100px] sm:w-[100px] mt-[15px] drop-shadow-lg"
              priority
            />
          </Link>
          <button
            className="group flex items-center gap-2 font-medium py-3 px-6 bg-white/90 backdrop-blur-sm border-2 border-black/20 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent"
            onClick={() => handleClick("section2")}
          >
            Get Started
            <Image
              src={assets.arrow}
              width={16}
              height={16}
              alt="Arrow"
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </button>
        </div>

        <div className="text-center my-20 ml-[20%]">
          <h1 className="text-3xl sm:text-5xl font-bold max-w-[800px] mx-auto leading-tight mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            {data?.title || "Blog Title"}
          </h1>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-gray-600 backdrop-blur-sm bg-white/60 rounded-2xl p-6 max-w-2xl mx-auto shadow-lg border border-white/20">
            <p className="text-lg font-medium">
              By{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">
                {data?.author || "Unknown Author"}
              </span>
            </p>
            {data?.createdAt && (
              <div className="flex items-center gap-2 text-sm">
                <span className="hidden sm:inline text-purple-400">•</span>
                <span className="font-medium">
                  {new Date(data.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
            {data?.readingTime && (
              <>
                <span className="hidden sm:inline text-purple-400">•</span>
                <p className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {data.readingTime} min read
                </p>
              </>
            )}
            {data?.views !== undefined && data?.views !== null && (
              <>
                <span className="hidden sm:inline text-purple-400">•</span>
                <p className="text-sm font-medium">
                  {data.views} {data.views === 1 ? "view" : "views"}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="relative z-10 mx-5 md:mx-12 lg:mx-28 mt-[-80px] mb-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Latest Articles Sidebar - Now Dynamic */}
          <div className="lg:w-80 lg:min-w-[320px] order-2 lg:order-1">
            <div className="sticky top-8">
              <div className="backdrop-blur-sm bg-white/80 rounded-3xl shadow-2xl border border-white/20 p-6 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Latest Articles
                  </h2>
                </div>
                // Replace the sidebar section in your page component // Replace
                the sidebar section in your page component
                {latestArticlesLoading ? (
                  <div className="space-y-4">
                    {[...Array(6)].map((_, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-2xl border border-gray-200 animate-pulse"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-16 h-16 bg-gray-300 rounded-xl"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : latestArticles.length > 0 ? (
                  <div className="space-y-4">
                    {latestArticles.map((article, index) => (
                      <Link
                        key={article._id}
                        href={`/blogs/${article._id}`}
                        className="group block p-4 rounded-2xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 border border-transparent hover:border-purple-200 hover:shadow-lg transform hover:scale-[1.02]"
                      >
                        <div className="flex items-start gap-3">
                          {/* Article Image */}
                          <div className="flex-shrink-0 relative">
                            {article.image ? (
                              <Image
                                src={article.image}
                                width={64}
                                height={64}
                                alt={article.title}
                                className="w-16 h-16 object-cover rounded-xl border-2 border-white shadow-md group-hover:shadow-lg transition-shadow duration-300"
                                onError={(e) => {
                                  e.target.src = "/default-article.png"; // Fallback image
                                }}
                              />
                            ) : (
                              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-white shadow-md flex items-center justify-center">
                                <svg
                                  className="w-6 h-6 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            )}
                            {/* Article number badge */}
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold group-hover:scale-110 transition-transform duration-300 shadow-md">
                              {index + 1}
                            </div>
                          </div>

                          {/* Article Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 group-hover:text-purple-700 line-clamp-2 mb-2 text-sm leading-tight transition-colors duration-300">
                              {article.title}
                            </h3>
                            {article.category && (
                              <span className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full mb-2 group-hover:bg-purple-200 transition-colors duration-300">
                                {article.category}
                              </span>
                            )}
                            <div className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                              {article.createdAt && (
                                <span>
                                  {new Date(
                                    article.createdAt
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                              )}
                              {article.author && (
                                <>
                                  <span>•</span>
                                  <span>By {article.author}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">No articles found</p>
                  </div>
                )}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Link
                    href="/"
                    className="block w-full text-center py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    View All Articles
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Article Content */}
          <div className="flex-1 order-1 lg:order-2">
            {/* Featured Image */}
            {data.image && !imageError ? (
              <div className="relative mb-12">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-xl opacity-30 scale-105"></div>
                <Image
                  className="relative border-8 border-white/50 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-3xl mx-auto block transform hover:scale-[1.02] transition-transform duration-500"
                  src={data.image}
                  width={800}
                  height={500}
                  alt={data.title || "Blog image"}
                  priority
                  onError={handleImageError}
                  style={{ objectFit: "cover", aspectRatio: "16/10" }}
                />
              </div>
            ) : (
              <div className="relative mb-12">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-blue-300 rounded-3xl blur-xl opacity-30 scale-105"></div>
                <div
                  className="relative border-8 border-white/50 backdrop-blur-sm bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-2xl flex items-center justify-center w-full max-w-3xl mx-auto"
                  style={{ aspectRatio: "16/10", minHeight: "400px" }}
                >
                  <div className="text-center text-gray-500">
                    <svg
                      className="mx-auto h-20 w-20 mb-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-lg font-medium">Image not available</p>
                  </div>
                </div>
              </div>
            )}

            {/* Article Content */}
            <div
              id="section2"
              className="backdrop-blur-sm bg-white/80 rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 mb-12"
            >
              {data.category && (
                <div className="mb-8">
                  <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg transform hover:scale-105 transition-transform duration-300">
                    {data.category}
                  </span>
                </div>
              )}

              {data.description ? (
                <div
                  className="blog-content prose prose-xl max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg prose-a:text-purple-600 prose-a:font-semibold prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50 prose-blockquote:rounded-r-lg prose-blockquote:shadow-sm"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              ) : (
                <div className="blog-content prose prose-xl max-w-none">
                  <p className="text-gray-500 italic text-center py-12 text-xl">
                    No content available for this article.
                  </p>
                </div>
              )}

              {/* Tags */}
              {data.tags &&
                Array.isArray(data.tags) &&
                data.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-bold text-gray-700 mb-4 uppercase tracking-wide">
                      Tags:
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {data.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-sm hover:shadow-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {/* Social Share */}
            <div className="text-center backdrop-blur-sm bg-white/60 rounded-3xl p-8 shadow-xl border border-white/20">
              <p className="text-gray-800 font-bold mb-8 text-xl">
                Share this amazing story
              </p>
              <div className="flex justify-center gap-6 mb-6">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    typeof window !== "undefined" ? window.location.href : ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer transform hover:scale-110 transition-all duration-300 block group"
                >
                  <Image
                    src={assets.facebook_icon}
                    width={60}
                    height={60}
                    alt="Share on Facebook"
                    className="rounded-2xl shadow-lg ring-4 ring-blue-200 group-hover:ring-blue-400 group-hover:shadow-2xl bg-gradient-to-tr from-blue-50 to-blue-200 group-hover:from-blue-100 group-hover:to-blue-300 transition-all duration-300"
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
                  className="cursor-pointer transform hover:scale-110 transition-all duration-300 block group"
                >
                  <Image
                    src={assets.twitter_icon}
                    width={60}
                    height={60}
                    alt="Share on Twitter"
                    className="rounded-2xl shadow-lg ring-4 ring-sky-200 group-hover:ring-sky-400 group-hover:shadow-2xl bg-gradient-to-tr from-white to-sky-200 group-hover:from-sky-100 group-hover:to-sky-300 transition-all duration-300"
                  />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    typeof window !== "undefined" ? window.location.href : ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer transform hover:scale-110 transition-all duration-300 block group"
                >
                  <Image
                    src={assets.googleplus_icon}
                    width={60}
                    height={60}
                    alt="Share on LinkedIn"
                    className="rounded-2xl shadow-lg ring-4 ring-blue-300 group-hover:ring-blue-500 group-hover:shadow-2xl bg-gradient-to-tr from-white to-blue-300 group-hover:from-blue-100 group-hover:to-blue-400 transition-all duration-300"
                  />
                </a>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      navigator.clipboard.writeText(window.location.href);
                      const button = event.target.closest("button");
                      const originalText = button.innerHTML;
                      button.innerHTML = `<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Copied!`;
                      button.classList.add("bg-green-500", "text-white");
                      setTimeout(() => {
                        button.innerHTML = originalText;
                        button.classList.remove("bg-green-500", "text-white");
                      }, 2000);
                    }
                  }}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all duration-300 text-base font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-5 h-5"
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
        </div>

        {/* Compact Custom Animations */}
        <style jsx>{`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1) rotate(0deg);
            }
            25% {
              transform: translate(30px, -50px) scale(1.1) rotate(90deg);
            }
            50% {
              transform: translate(-20px, 20px) scale(0.9) rotate(180deg);
            }
            75% {
              transform: translate(-40px, -20px) scale(1.05) rotate(270deg);
            }
            100% {
              transform: translate(0px, 0px) scale(1) rotate(360deg);
            }
          }
          @keyframes slide-vertical {
            0%,
            100% {
              transform: translateY(0px) scale(1);
              opacity: 0.6;
            }
            50% {
              transform: translateY(-30px) scale(1.2);
              opacity: 1;
            }
          }
          @keyframes slide-vertical-reverse {
            0%,
            100% {
              transform: translateY(0px) scale(1);
              opacity: 0.6;
            }
            50% {
              transform: translateY(30px) scale(1.2);
              opacity: 1;
            }
          }
          .animate-blob {
            animation: blob 12s infinite;
          }
          .animate-slide-vertical {
            animation: slide-vertical 4s ease-in-out infinite;
          }
          .animate-slide-vertical-reverse {
            animation: slide-vertical-reverse 4s ease-in-out infinite;
          }
          .animation-delay-1000 {
            animation-delay: 1s;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-3000 {
            animation-delay: 3s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          .animation-delay-5000 {
            animation-delay: 5s;
          }
          .animation-delay-6000 {
            animation-delay: 6s;
          }
        `}</style>
      </div>
      <Footer />
    </div>
  );
};

export default page;
