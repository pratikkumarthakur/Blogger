// import { assets } from "@/Assests/assets";
// import Image from "next/image";
// import React from "react";

// const BlogTableItem = ({authorImage,title,author,date,deleteBlog,mongoId}) => {
// const BlogDate=new Date(date);
//     //taken from gpt
//     const imageSrc =
//     typeof authorImage === "object" && authorImage?.src
//       ? authorImage.src
//       : assets.profile_icon.src;

//   return (
//     <tr className="bg-white border-b ">
//       <th
//         scope="row"
//         className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
//       >
//         {/* <Image width={40} height={40} src={authorImage?authorImage:assets.profile_icon} alt="" /> */}
//         <Image width={40} height={40} src={imageSrc} alt="Author" />
        
//         <p>{author?author:"No Author"}</p>
//       </th>
//       <td className="px-6 py-4">
// {title?title:"no title"}
//       </td>
//       <td className="px-6 py-4">
// {BlogDate.toDateString()}
//       </td>
//       <td onClick={()=>deleteBlog(mongoId)} className="px-6 py-4 cursor-pointer">
// x
//       </td>
//     </tr>
//   );
// };

// export default BlogTableItem;


import { assets } from "@/Assests/assets";
import Image from "next/image";
import React from "react";

const BlogTableItem = ({ authorImage, title, author, date, deleteBlog, mongoId, category }) => {
  const BlogDate = new Date(date);
  
  // Handle image source properly
  const imageSrc =
    typeof authorImage === "object" && authorImage?.src
      ? authorImage.src
      : assets.profile_icon.src;

  // Color mapping for health categories
  const getCategoryColor = (category) => {
    const colorMap = {
      'Sexual Health': 'bg-red-100 text-red-800',
      "Men's Performance": 'bg-blue-100 text-blue-800',
      "Women's Vitality": 'bg-pink-100 text-pink-800',
      'Art of Intimacy': 'bg-purple-100 text-purple-800',
      'Wellness Tips': 'bg-green-100 text-green-800',
      'Weight Management': 'bg-orange-100 text-orange-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return colorMap[category] || colorMap.default;
  };

  return (
    <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
      <th
        scope="row"
        className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <div className="relative">
          <Image 
            width={40} 
            height={40} 
            src={imageSrc} 
            alt="Author" 
            className="rounded-full object-cover border-2 border-gray-200"
          />
          {/* Online status indicator */}
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div>
          <p className="font-semibold text-gray-900">
            {author ? author : "No Author"}
          </p>
          <p className="text-xs text-gray-500">Health Expert</p>
        </div>
      </th>
      
      <td className="px-6 py-4">
        <div className="max-w-xs">
          <p className="font-medium text-gray-900 truncate">
            {title ? title : "No Title"}
          </p>
          {category && (
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${getCategoryColor(category)}`}>
              {category}
            </span>
          )}
        </div>
      </td>
      
      <td className="px-6 py-4">
        <div className="text-sm">
          <p className="text-gray-900 font-medium">
            {BlogDate.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-gray-500 text-xs">
            {BlogDate.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
      </td>
      
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            onClick={() => {/* Add edit functionality */}}
          >
            Edit
          </button>
          <button
            onClick={() => deleteBlog(mongoId)}
            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-full transition-colors group"
            title="Delete Blog"
          >
            <svg 
              className="w-4 h-4 group-hover:scale-110 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;
