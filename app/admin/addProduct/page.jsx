"use client";
import { assets } from "@/Assests/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
      Loading editor...
    </div>
  ),
});

import "react-quill-new/dist/quill.snow.css";

const page = () => {
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Sexual Health",
    author: "ADMIN",
    authorImg: "/health_expert.png",
  });

  // Regular input handler for text inputs and selects
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
    console.log("Updated data:", { ...data, [name]: value });
  };

  // Special handler for ReactQuill
  const onDescriptionChange = (value) => {
    setData((prevData) => ({ ...prevData, description: value }));
    console.log("Updated description:", value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Validation
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    if (!data.title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!data.description.trim() || data.description === "<p><br></p>") {
      toast.error("Please enter article content");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", data.title.trim());
      formData.append("description", data.description.trim());
      formData.append("category", data.category);
      formData.append("author", data.author.trim());
      formData.append("authorImg", data.authorImg);
      formData.append("image", image);

      // Debug: Log form data contents
      console.log("Form data being sent:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axios.post("/api/blog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000, // 30 seconds timeout
      });

      if (response.data.success) {
        toast.success(response.data.msg || "Article published successfully!");

        // Reset form
        setImage(null);
        setData({
          title: "",
          description: "",
          category: "Sexual Health",
          author: "ADMIN",
          authorImg: "/health_expert.png",
        });

        // Reset file input
        const fileInput = document.getElementById("image");
        if (fileInput) {
          fileInput.value = "";
        }
      } else {
        toast.error(response.data.msg || "Failed to publish article");
      }
    } catch (error) {
      console.error("Submit error:", error);

      if (error.response) {
        // Server responded with error status
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);

        const errorMsg =
          error.response.data?.message ||
          error.response.data?.error ||
          `Server error: ${error.response.status}`;
        toast.error(errorMsg);
      } else if (error.request) {
        // Network error
        console.error("Network error:", error.request);
        toast.error("Network error. Please check your connection.");
      } else {
        // Other error
        console.error("Error:", error.message);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a valid image file (JPG, PNG, or WebP)");
        return;
      }

      setImage(file);
    }
  };

  // ReactQuill modules configuration
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
    "align",
    "code-block",
  ];

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
                    onChange={handleImageChange}
                    type="file"
                    id="image"
                    hidden
                    accept="image/jpeg,image/png,image/webp"
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
                disabled={isSubmitting}
              />
            </div>

            {/* Article Description with ReactQuill */}
            <div className="space-y-2">
              <label className="block text-lg font-semibold text-gray-700">
                Article Content <span className="text-red-500">*</span>
              </label>
              <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200">
                <ReactQuill
                  theme="snow"
                  value={data.description}
                  onChange={onDescriptionChange}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Write your health article content here. Include valuable insights, tips, and evidence-based information..."
                  style={{
                    minHeight: "200px",
                  }}
                />
              </div>
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                disabled={isSubmitting}
                className={`px-8 py-3 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 focus:ring-4 focus:ring-blue-300 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 hover:scale-105"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Publishing...</span>
                  </div>
                ) : (
                  "Publish Article"
                )}
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
