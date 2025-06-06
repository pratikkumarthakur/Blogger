// "use client";
// import BlogTableItem from "@/Components/AdminComponents/BlogTableItem";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// const page = () => {
//   const [blogs, setBlogs] = useState([]);

//   const fetchBlogs = async () => {
//     const response = await axios.get("/api/blog");
//     setBlogs(response.data.blogs);
//   };

//   const deleteBlog = async (mongoId)=>{
//     const response = await axios.delete("/api/blog",{
//         params:{
//             id:mongoId
//         }
//     })
//     toast.success(response.data.msg)
//     fetchBlogs()
//   }

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   return (
//     <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
//       <h1>All Blogs</h1>
//       <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide ">
//         <table className="w-full text-sm text-gray-500">
//           <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
//             <tr>
//               <th scope="col" className="hidden sm:block px-6 py-3">
//                 Author Name
//               </th>
//               <th scope="col" className=" px-6 py-3">
//                 Blog Title
//               </th>
//               <th scope="col" className=" px-6 py-3">
//                 Date
//               </th>
//               <th scope="col" className=" px-6 py-3">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {blogs.map((item, index) => {
//               return (
//                 <BlogTableItem
//                   key={index}
//                   item={item}
//                   mongoId={item._id}
//                   title={item.title}
//                   author={item.author}
//                   authorImage={item.authorImage}
//                   date={item.date}
//                   deleteBlog={deleteBlog}
//                 />
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default page;
"use client";
import BlogTableItem from "@/Components/AdminComponents/BlogTableItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs);
    } catch (error) {
      toast.error("Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (mongoId) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        const response = await axios.delete("/api/blog", {
          params: {
            id: mongoId
          }
        });
        toast.success(response.data.msg);
        fetchBlogs();
      } catch (error) {
        toast.error("Failed to delete article");
      }
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter and sort blogs
  const filteredBlogs = blogs
    .filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "All" || blog.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const categories = ["All", "Sexual Health", "Men's Performance", "Women's Vitality", "Art of Intimacy", "General Wellness", "Mental Health"];

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Health Articles</h1>
              <p className="text-gray-600">Manage your health content and articles</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
                <span className="text-sm text-gray-600">Total Articles: </span>
                <span className="font-semibold text-blue-600">{blogs.length}</span>
              </div>
              <button 
                onClick={() => window.location.href = '/admin/addProduct'}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                + New Article
              </button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === "All" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Title A-Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No articles found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || filterCategory !== "All" 
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by creating a new health article"
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th scope="col" className="hidden sm:table-cell px-6 py-4 text-left font-semibold">
                      Author
                    </th>
                    <th scope="col" className="px-6 py-4 text-left font-semibold">
                      Article Title
                    </th>
                    <th scope="col" className="hidden md:table-cell px-6 py-4 text-left font-semibold">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-4 text-left font-semibold">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-4 text-left font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBlogs.map((item, index) => (
                    <BlogTableItem
                      key={index}
                      item={item}
                      mongoId={item._id}
                      title={item.title}
                      author={item.author}
                      authorImage={item.authorImage}
                      date={item.date}
                      category={item.category}
                      deleteBlog={deleteBlog}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        {!loading && filteredBlogs.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{filteredBlogs.length}</div>
                <div className="text-sm text-gray-600">
                  {searchTerm || filterCategory !== "All" ? "Filtered" : "Total"} Articles
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {new Set(filteredBlogs.map(blog => blog.author)).size}
                </div>
                <div className="text-sm text-gray-600">Active Authors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {new Set(filteredBlogs.map(blog => blog.category)).size}
                </div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {filteredBlogs.filter(blog => {
                    const articleDate = new Date(blog.date);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return articleDate > weekAgo;
                  }).length}
                </div>
                <div className="text-sm text-gray-600">This Week</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;