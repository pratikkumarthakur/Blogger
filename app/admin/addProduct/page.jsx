// "use client";
// import { assets } from "@/Assests/assets";
// import axios from "axios";
// import Image from "next/image";
// import React, { useState } from "react";
// import { toast } from "react-toastify";

// const page = () => {
//   const [image, setImage] = useState(false);
//   const [data, setData] = useState({
//     title: "",
//     description: "",
//     category: "Startup",
//     author: "Alex Bennet",
//     authorImg: "/author_img.png",
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//     console.log(data);
//   };

// const onSubmitHandler = async (e)=>{
//  e.preventDefault();
// const formData = new FormData();
// formData.append('title',data.title);
// formData.append('description',data.description);
// formData.append('category',data.category);
// formData.append('author',data.author);
// formData.append('authorImg',data.authorImg);
// formData.append('image',image);
// const response = await axios.post('/api/blog',formData)
//   if(response.data.success){
//     toast.success(response.data.msg);
//     setImage(false)
//     setData({
//         title: "",
//         description: "",
//         category: "Startup",
//         author: "Alex Bennet",
//         authorImg: "/author_img.png",
//       })
//   }else{
//     toast.error("Error")
//   }
// }

//   return (
//     <>
//       <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pl-16 sm:pt-12">
//         <p className="text-xl">Upload thumbnail</p>
//         <label htmlFor="image">
//           <Image
//             className="mt-4"
//             src={!image ? assets.upload_area : URL.createObjectURL(image)}
//             width={140}
//             height={70}
//             alt=""
//           />
//         </label>
//         <input
//           onChange={(e) => setImage(e.target.files[0])}
//           type="file"
//           id="image"
//           hidden
//           required
//         />
//         <p className="text-xl mt-4">Blog Title</p>
//         <input name="title" onChange={onChangeHandler} value={data.title}
//           className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
//           type="text"
//           placeholder="Type here"
//           required
//         />
//         <p className="text-xl mt-4">Blog Description</p>
//         <textarea name="description" onChange={onChangeHandler} value={data.description}
//           className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
//           type="text"
//           placeholder="Write content here."
//           rows={6}
//           required
//         />
//         <p className="text-xl mt-4">Blog Category</p>
//         <select
//           name="category" onChange={onChangeHandler} value={data.category}
//           className="w-40 mt-4 px-4 py-3 border text-gray-500"
//         >
//           <option value={"Startup"}>Startup</option>
//           <option value={"Technology"}>Technology</option>
//           <option value={"Lifestyle"}>Lifestyle</option>
//         </select>
//         <br />
//         <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
//           ADD
//         </button>
//       </form>
//     </>
//   );
// };

// export default page;

"use client";
import { assets } from "@/Assests/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Sexual Health",
    author: "Dr. Sarah Johnson",
    authorImg: "/health_expert.png",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
    console.log(data);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);

    const response = await axios.post("/api/blog", formData);

    if (response.data.success) {
      toast.success(response.data.msg);
      setImage(false);
      setData({
        title: "",
        description: "",
        category: "Sexual Health",
        author: "Dr. Sarah Johnson",
        authorImg: "/health_expert.png",
      });
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Health Article
          </h1>
          <p className="text-gray-600">
            Share valuable health insights with our community
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <form onSubmit={onSubmitHandler} className="space-y-8">
            {/* Thumbnail Upload Section */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-700">
                Article Thumbnail
              </label>
              <div className="flex items-start gap-6">
                <div className="relative group">
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-200 group-hover:border-blue-400"
                  >
                    {image ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={URL.createObjectURL(image)}
                          alt="Preview"
                          fill
                          className="object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                          <p className="text-white text-sm font-medium">
                            Change Image
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <svg
                          className="w-8 h-8 mb-2 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                        <p className="text-sm text-gray-500 text-center">
                          Upload Image
                        </p>
                      </>
                    )}
                  </label>
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    id="image"
                    hidden
                    required
                    accept="image/*"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 mb-2">
                    Image Guidelines
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Recommended size: 800x600px</li>
                    <li>• File formats: JPG, PNG, WebP</li>
                    <li>• Maximum file size: 5MB</li>
                    <li>• Use high-quality, relevant health images</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Article Title */}
            <div className="space-y-2">
              <label className="block text-lg font-semibold text-gray-700">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                onChange={onChangeHandler}
                value={data.title}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                type="text"
                placeholder="Enter compelling article title..."
                required
              />
            </div>

            {/* Article Description */}
            <div className="space-y-2">
              <label className="block text-lg font-semibold text-gray-700">
                Article Content <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                onChange={onChangeHandler}
                value={data.description}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[200px] resize-vertical"
                placeholder="Write your health article content here. Include valuable insights, tips, and evidence-based information..."
                required
              />
              <p className="text-sm text-gray-500">
                Tip: Use clear headings, bullet points, and cite credible
                sources for better readability.
              </p>
            </div>

            {/* Category and Author Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Selection */}
              <div className="space-y-2">
                <label className="block text-lg font-semibold text-gray-700">
                  Health Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  onChange={onChangeHandler}
                  value={data.category}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                >
                  <option value="Sexual Health">Sexual Health</option>
                  <option value="Men's Performance">Men's Performance</option>
                  <option value="Women's Vitality">Women's Vitality</option>
                  <option value="Art of Intimacy">Art of Intimacy</option>
                  <option value="General Wellness">General Wellness</option>
                  <option value="Mental Health">Mental Health</option>
                </select>
              </div>

              {/* Author Name */}
              <div className="space-y-2">
                <label className="block text-lg font-semibold text-gray-700">
                  Author Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="author"
                  onChange={onChangeHandler}
                  value={data.author}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  type="text"
                  placeholder="Enter author name..."
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Article will be reviewed before publishing</span>
              </div>

              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-blue-300"
              >
                Publish Article
              </button>
            </div>
          </form>
        </div>

        {/* Tips Card */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Writing Tips for Health Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <p className="font-medium mb-1">Content Quality:</p>
              <p>• Use evidence-based information</p>
              <p>• Include credible sources</p>
              <p>• Write in accessible language</p>
            </div>
            <div>
              <p className="font-medium mb-1">Engagement:</p>
              <p>• Start with compelling headlines</p>
              <p>• Use subheadings and bullet points</p>
              <p>• Include actionable advice</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
