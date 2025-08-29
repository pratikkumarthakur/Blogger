import { blog_data } from "@/Assests/assets";
import React, { useEffect, useState } from "react";
import Blogitem from "./Blogitem";
import axios from "axios";
import { scrollToMid } from "./Header";
import Link from "next/link";

const BlogList = ({ title, description, category, image, id }) => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest"); // New state for sorting

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog");
    setBlogs(response.data.blogs);
    console.log(response.data.blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const categories = [
    { id: "All", label: "All Topics" },
    { id: "Sexual Health", label: "Sexual Health" },
    { id: "Men's Performance", label: "Men's Performance" },
    { id: "Women's Vitality", label: "Women's Vitality" },
    { id: "Art of Intimacy", label: "Art of Intimacy" },
    { id: "Mental Health", label: "Mental Health" },
    { id: "General Wellness", label: "General Wellness" },
  ];

  // Function to get blogs by category
  const getBlogsByCategory = (category) => {
    return blogs.filter((blog) => blog.category === category);
  };

  // Function to sort blogs based on date
  const sortBlogs = (blogsToSort) => {
    const sortedBlogs = [...blogsToSort];

    if (sortOrder === "latest") {
      // Sort by newest first (assuming createdAt or date field exists)
      return sortedBlogs.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.date || a._id);
        const dateB = new Date(b.createdAt || b.date || b._id);
        return dateB - dateA;
      });
    } else {
      // Sort by oldest first
      return sortedBlogs.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.date || a._id);
        const dateB = new Date(b.createdAt || b.date || b._id);
        return dateA - dateB;
      });
    }
  };

  // Function to render blog section with navigation
  const renderBlogSection = (
    categoryId,
    categoryName,
    sectionId,
    bgGradient = "from-gray-50 to-gray-100",
    borderColor = "border-gray-200"
  ) => {
    const categoryBlogs = getBlogsByCategory(categoryId);

    if (categoryBlogs.length === 0) return null;

    return (
      <section id={sectionId} className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            {categoryName}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Latest insights and expert advice on {categoryName.toLowerCase()}.
          </p>
        </div>

        <div
          className={`bg-gradient-to-br ${bgGradient} rounded-2xl p-8 ${borderColor} border mb-8`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryBlogs.slice(0, 6).map((item, index) => (
              // Remove the Link wrapper here and let Blogitem handle its own linking
              <div
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow rounded-xl"
              >
                <Blogitem
                  id={item._id}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  category={item.category}
                  
                />
              </div>
            ))}
          </div>
          {categoryBlogs.length > 6 && (
            <Link href={`/blogs/category/${categoryId}`}>
              <button className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors font-medium">
                View All {categoryName} Articles →
              </button>
            </Link>
          )}
        </div>
      </section>
    );
  };

  // Get filtered and sorted blogs for the all articles section
  const getFilteredAndSortedBlogs = () => {
    const filteredBlogs = blogs.filter((item) =>
      menu === "All" ? true : item.category === menu
    );
    return sortBlogs(filteredBlogs);
  };

  return (
    <div className="py-12 px-5 md:px-12 lg:px-28">
      {/* Dynamic Category Sections */}
      {renderBlogSection(
        "Sexual Health",
        "Sexual Health",
        "sexual-health-articles",
        "from-blue-50 to-blue-100",
        "border-blue-200"
      )}

      {renderBlogSection(
        "Men's Performance",
        "Men's Performance",
        "mens-performance-articles",
        "from-red-50 to-pink-100",
        "border-red-200"
      )}

      {renderBlogSection(
        "Women's Vitality",
        "Women's Vitality",
        "womens-vitality-articles",
        "from-pink-50 to-rose-100",
        "border-pink-200"
      )}

      {renderBlogSection(
        "Art of Intimacy",
        "Art of Intimacy",
        "art-of-intimacy-articles",
        "from-amber-50 to-yellow-100",
        "border-amber-200"
      )}

      {/* Category Filter for All Articles View */}
      <div id="all-articles" className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Browse All Health Topics
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setMenu(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                menu === category.id
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* All Blog Articles Grid - Filtered View */}
      <div>
        {/* Header with Sort Options */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 id="mid" className="text-3xl font-bold mb-4 md:mb-0">
            {menu === "All" ? "All Health Articles" : `${menu} Articles`}
          </h2>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Sort by:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSortOrder("latest")}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  sortOrder === "latest"
                    ? "bg-white text-gray-800 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Latest
              </button>
              <button
                onClick={() => setSortOrder("oldest")}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  sortOrder === "oldest"
                    ? "bg-white text-gray-800 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Oldest
              </button>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getFilteredAndSortedBlogs().map((item, index) => {
            return (
              // Remove the Link wrapper here too and let Blogitem handle its own linking
              <div
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow rounded-xl"
              >
                <Blogitem
                  id={item._id}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  category={item.category}
                />
              </div>
            );
          })}
        </div>

        {getFilteredAndSortedBlogs().length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No articles found in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
