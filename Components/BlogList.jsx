// import { blog_data } from "@/Assests/assets";
// import React, { useEffect, useState } from "react";
// import Blogitem from "./Blogitem";
// import axios from "axios";

// const BlogList = () => {
//   const [menu, setMenu] = useState("All");
//   const [blogs,setBlogs] = useState([])

//   const fetchBlogs = async ()=>{
//     const response = await axios.get('/api/blog')
//     setBlogs(response.data.blogs);
//     console.log(response.data.blogs);
//   }

//   useEffect(()=>{
//     fetchBlogs()
//   },[])

//   return (
//     <div>
//       <div className="flex justify-center gap-6 my-10">
//         <button
//           onClick={() => setMenu("All")}
//           className={
//             menu === "All" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
//           }
//         >
//           All
//         </button>
//         <button
//           onClick={() => setMenu("Technology")}
//           className={
//             menu === "Technology" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
//           }
//         >
//           Technology
//         </button>
//         <button
//           onClick={() => setMenu("Startup")}
//           className={
//             menu === "Startup" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
//           }
//         >
//           Startup
//         </button>
//         <button
//           onClick={() => setMenu("Lifestyle")}
//           className={
//             menu === "Lifestyle" ? "bg-black text-white py-1 px-4 rounded-sm cursor-pointer" : ""
//           }
//         >
//           Lifestyle
//         </button>
//       </div>
//       <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
//         {blogs.filter((item)=> menu==="All"?true: item.category===menu  ).map((item, index) => {
//           return (
//             <Blogitem
//               key={index} id={item._id}
//               image={item.image}
//               title={item.title}
//               description={item.description}
//               category={item.category}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default BlogList;


import { blog_data } from "@/Assests/assets";
import React, { useEffect, useState } from "react";
import Blogitem from "./Blogitem";
import axios from "axios";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get('/api/blog');
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
    { id: "Wellness Tips", label: "Wellness Tips" }
  ];

  return (
    <div className="py-12 px-5 md:px-12 lg:px-28">
      {/* Category Filter */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Explore Our Health Topics</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setMenu(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                menu === category.id
                  ? "bg-black text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Solutions Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Weight Management Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Lose weight with GLP-1s
          </h3>
          <p className="text-gray-600 mb-6">
            Clinically proven weight management solutions with personalized treatment plans.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
            Get Started →
          </button>
        </div>

        {/* Performance Enhancement Card */}
        <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl p-8 border border-red-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Enhanced Performance
            <span className="text-sm bg-red-500 text-white px-2 py-1 rounded-full ml-2">
              Best seller
            </span>
          </h3>
          <p className="text-gray-600 mb-6">
            Boost confidence and performance with our expert-recommended solutions.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
            Get Started →
          </button>
        </div>
      </div>

      {/* Additional Treatment Options */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <h4 className="font-semibold mb-2 text-gray-800">Access Zepbound® in a vial</h4>
          <p className="text-sm text-gray-600 mb-4">Advanced weight management therapy</p>
          <button className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            Learn More →
          </button>
        </div>

        <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
          <h4 className="font-semibold mb-2 text-gray-800">Have better intimacy with Daily Rise</h4>
          <p className="text-sm text-gray-600 mb-4">Comprehensive relationship wellness</p>
          <button className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            Learn More →
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h4 className="font-semibold mb-2 text-gray-800">Regrow your confidence</h4>
          <p className="text-sm text-gray-600 mb-4">Hair restoration and wellness solutions</p>
          <button className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            Learn More →
          </button>
        </div>
      </div>

      {/* Blog Articles Grid */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Latest Health Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs
            .filter((item) => menu === "All" ? true : item.category === menu)
            .map((item, index) => {
              return (
                <Blogitem
                  key={index}
                  id={item._id}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  category={item.category}
                  
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default BlogList;