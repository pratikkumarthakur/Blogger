import { assets } from "@/Assests/assets";
import Image from "next/image";
import React from "react";

const BlogTableItem = ({authorImage,title,author,date,deleteBlog,mongoId}) => {
const BlogDate=new Date(date);
    //taken from gpt
    const imageSrc =
    typeof authorImage === "object" && authorImage?.src
      ? authorImage.src
      : assets.profile_icon.src;

  return (
    <tr className="bg-white border-b ">
      <th
        scope="row"
        className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {/* <Image width={40} height={40} src={authorImage?authorImage:assets.profile_icon} alt="" /> */}
        <Image width={40} height={40} src={imageSrc} alt="Author" />
        
        <p>{author?author:"No Author"}</p>
      </th>
      <td className="px-6 py-4">
{title?title:"no title"}
      </td>
      <td className="px-6 py-4">
{BlogDate.toDateString()}
      </td>
      <td onClick={()=>deleteBlog(mongoId)} className="px-6 py-4 cursor-pointer">
x
      </td>
    </tr>
  );
};

export default BlogTableItem;
