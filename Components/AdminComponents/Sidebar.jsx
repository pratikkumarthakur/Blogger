// import { assets } from "@/Assests/assets";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const Sidebar = () => {
//   return (
//     <div className="flex flex-col bg-slate-100">
//       <div className="px-2 sm:pl-14 py-3 border border-black">
//         <Image src={assets.logo} width={120} alt="" />
//       </div>
//       <div className="w-28 sm:w-80 h-[100vh] relative py-12 border border-black">
//         <div className="w-[50%] sm:w-[80%] absolute right-0">
//           <Link href='/admin/addProduct' className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] ">
//             <Image src={assets.add_icon} alt="" width={28} /> <p>Add blogs</p>
//           </Link>
//           <Link href='/admin/blogList' className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] ">
//             <Image src={assets.blog_icon} alt="" width={28} /> <p>Blog list</p>
//           </Link>
//           <Link href='/admin/subscriptions' className=" mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] ">
//             <Image src={assets.email_icon} alt="" width={28} /> <p>Subscription</p>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import { assets } from "@/Assests/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen shadow-lg">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <Image src={assets.logo} width={120} alt="Wellness Hub Admin" />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">Admin Panel</p>
            <p className="text-xs text-gray-500">Health Content Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 sm:px-6 py-8">
        <nav className="space-y-4">
          {/* Dashboard Overview */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Content Management
            </h3>
          </div>

          {/* Add Blog */}
          <Link 
            href='/admin/addProduct' 
            className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <Image src={assets.add_icon} alt="" width={24} height={24} />
            </div>
            <div className="hidden sm:block">
              <p className="font-semibold text-gray-900 group-hover:text-blue-700">Add Health Article</p>
              <p className="text-sm text-gray-500">Create new wellness content</p>
            </div>
          </Link>

          {/* Blog List */}
          <Link 
            href='/admin/blogList' 
            className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
              <Image src={assets.blog_icon} alt="" width={24} height={24} />
            </div>
            <div className="hidden sm:block">
              <p className="font-semibold text-gray-900 group-hover:text-green-700">Manage Articles</p>
              <p className="text-sm text-gray-500">View and edit health content</p>
            </div>
          </Link>

          {/* Subscriptions */}
          <Link 
            href='/admin/subscriptions' 
            className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex-shrink-0 p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
              <Image src={assets.email_icon} alt="" width={24} height={24} />
            </div>
            <div className="hidden sm:block">
              <p className="font-semibold text-gray-900 group-hover:text-purple-700">Newsletter Subscribers</p>
              <p className="text-sm text-gray-500">Manage wellness newsletter</p>
            </div>
          </Link>

          {/* Additional Health-focused Menu Items */}
          <div className="mt-8 mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Health Categories
            </h3>
          </div>

          {/* Category Management */}
          <Link 
            href='/admin/categories' 
            className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex-shrink-0 p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <p className="font-semibold text-gray-900 group-hover:text-orange-700">Health Categories</p>
              <p className="text-sm text-gray-500">Manage topic categories</p>
            </div>
          </Link>

          {/* Analytics */}
          <Link 
            href='/admin/analytics' 
            className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex-shrink-0 p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700">Content Analytics</p>
              <p className="text-sm text-gray-500">Track engagement metrics</p>
            </div>
          </Link>
        </nav>

        {/* Health Stats Card */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
          <h4 className="font-semibold text-gray-800 mb-2">Platform Impact</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Active Readers</span>
              <span className="font-semibold text-blue-600">2M+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Health Articles</span>
              <span className="font-semibold text-green-600">500+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Newsletter Subscribers</span>
              <span className="font-semibold text-purple-600">50K+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <p className="text-xs text-gray-500 text-center">
          Wellness Hub Admin © 2024
        </p>
      </div>
    </div>
  );
};

export default Sidebar;