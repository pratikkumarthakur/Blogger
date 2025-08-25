import { assets, blog_data } from "@/Assests/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Blogitem({ title, description, category, image, id }) {
  // Color mapping for different general blog categories
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

  const getBorderColor = (category) => {
    const colorMap = {
      Technology: "border-blue-200",
      Lifestyle: "border-green-200",
      Travel: "border-purple-200",
      "Food & Recipes": "border-orange-200",
      Business: "border-gray-200",
      "Health & Fitness": "border-red-200",
      Education: "border-indigo-200",
      Entertainment: "border-pink-200",
      Finance: "border-emerald-200",
      Sports: "border-yellow-200",
      default: "border-gray-200",
    };
    return colorMap[category] || colorMap.default;
  };

  return (
    <div
      className={`max-w-[400px] bg-white rounded-2xl border-2 ${getBorderColor(
        category
      )} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
    >
      <Link href={`/blogs/${id}`}>
        <div className="relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={400}
            height={250}
            className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span
              className={`${getCategoryColor(
                category
              )} text-white text-xs font-semibold py-2 px-3 rounded-full shadow-lg`}
            >
              {category}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <h5 className="mb-3 text-xl font-bold tracking-tight text-gray-900 leading-tight hover:text-blue-600 transition-colors">
          <Link href={`/blogs/${id}`}>{title}</Link>
        </h5>

        <p
          className="mb-4 text-gray-600 leading-relaxed text-sm"
          dangerouslySetInnerHTML={{
            __html: description.slice(0, 140) + "...",
          }}
        />

        <Link
          href={`/blogs/${id}`}
          className="inline-flex items-center text-black font-semibold hover:text-blue-600 transition-colors group"
        >
          Read Full Article
          <Image
            src={assets.arrow}
            className="ml-2 group-hover:translate-x-1 transition-transform"
            alt="arrow"
            width={12}
            height={12}
          />
        </Link>
      </div>
    </div>
  );
}

export default Blogitem;
