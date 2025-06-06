// import { assets } from "@/Assests/assets";
// import Sidebar from "@/Components/AdminComponents/Sidebar";
// import Image from "next/image";
// import { ToastContainer} from 'react-toastify';


// export default function Layout({ children }) {
//   return (
//     <>
//       <div className="flex">
//         <ToastContainer theme="dark" />
//         <Sidebar />
//         <div className="flex flex-col w-full">
//           <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
//             <h3 className="font-medium">Admin Panel</h3>
//             <Image src={assets.profile_icon} width={40} alt="" />
//           </div>
//           {children}
//         </div>
//       </div>
//     </>
//   );
// }

import { assets } from "@/Assests/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';

export default function Layout({ children }) {
  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        <ToastContainer 
          theme="light" 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastClassName="text-sm"
        />
        
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex flex-col w-full">
          {/* Top Navigation Bar */}
          <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between w-full py-4 px-6 lg:px-12">
              {/* Left Section */}
              <div className="flex items-center space-x-4">
                <div className="hidden lg:block">
                  <h3 className="text-xl font-semibold text-gray-800">Health Admin Panel</h3>
                  <p className="text-sm text-gray-600">Manage your wellness platform</p>
                </div>
                <div className="lg:hidden">
                  <h3 className="text-lg font-semibold text-gray-800">Admin Panel</h3>
                </div>
              </div>

              {/* Center Section - Search Bar (Hidden on mobile) */}
              <div className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search articles, subscribers..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </button>
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                    3
                  </span>
                </div>

                {/* Quick Actions Dropdown */}
                <div className="relative">
                  <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="hidden sm:inline text-sm font-medium">Quick Add</span>
                  </button>
                </div>

                {/* Admin Profile */}
                <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-gray-800">Dr. Admin</p>
                    <p className="text-xs text-gray-600">Health Administrator</p>
                  </div>
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                      <Image 
                        src={assets.profile_icon} 
                        width={40} 
                        height={40}
                        alt="Admin Profile" 
                        className="rounded-full"
                      />
                    </div>
                    <span className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 px-6 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="text-sm text-gray-600 mb-2 sm:mb-0">
                © 2025 Health Admin Panel. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>System Status: Healthy</span>
                </span>
                <span>Version 2.1.0</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}