// "use client";
// import { assets, blog_data } from "@/Assests/assets";
// import Footer from "@/Components/Footer";
// import axios from "axios";

// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";

// const page = ({ params }) => {
//   const [data, setData] = useState(null);

//   const resolvedParams = React.use(params);

//   const fetchBlogData = async () => {
//     const response = await axios.get("/api/blog", {
//       params: {
//         id: resolvedParams.id,
//       },
//     });
//     setData(response.data.blog);
//   };

//   useEffect(() => {
//     fetchBlogData();
//   }, []);

//   return data ? (
//     <>
//       <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28 ">
//         <div className="flex justify-between items-center">
//           <Link href="/">
//             <Image
//               src={assets.logo}
//               width={280}
//               alt=""
//               className="w-[230px] sm:w-auto"
//               priority
//             />
//           </Link>
//           <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
//             Get Started <Image src={assets.arrow} alt="" />
//           </button>
//         </div>

//         <div className="text-center my-24 ">
//           <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto ">
//             {" "}
//             {data.title}
//           </h1>

//           {/* FIX THE ERROR */}
//           {/* 
//           <Image
         
//             className="mx-auto mt-6 border border-white rounded-full"
//             src={data.authorImg}
//             width={60}
//             height={60}
//             alt=""
//           /> */}
//           {data.authorImg && (
//             <Image
//               className="mx-auto mt-6 border border-white rounded-full"
//               src={data.authorImg}
//               width={60}
//               height={60}
//               alt=""
//             />
//           )}

//           <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
//             {data.author}
//           </p>
//         </div>
//       </div>
//       <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
//         <Image
//           className="border-4 border-white"
//           src={data.image}
//           width={1280}
//           height={720}
//           alt=""
//         />

//        <div className="blog-content" dangerouslySetInnerHTML={{__html:data.description}}>

//        </div>

//         <div className="my-24">
//           <p className="text-black font- font-semibold my-4">
//             Share this article on Social Media
//           </p>
//           <div className="flex">
//             <Image src={assets.facebook_icon} width={50} alt="" />
//             <Image src={assets.twitter_icon} width={50} alt="" />
//             <Image src={assets.googleplus_icon} width={50} alt="" />
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   ) : (
//     <></>
//   );
// };

// export default page;

"use client";
import { assets } from "@/Assests/assets";
import Footer from "@/Components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";




const page = ({ params }) => {
  const [data, setData] = useState(null);
  
  const resolvedParams = React.use(params); // Unwrap the params Promise

  const fetchBlogData = async () => {
    if (!resolvedParams?.id) return;
    const response = await axios.get("/api/blog", {
      params: {
        id: resolvedParams.id,
      },
    });
    setData(response.data.blog);
  };

  useEffect(() => {
    fetchBlogData();
    // eslint-disable-next-line
  }, [resolvedParams?.id]);
  

 const handleScroll = () => {
  window.scrollTo({
    top: window.innerHeight / 2,
    behavior: "smooth",
  });
};

  return data ? (
    <>
      <div className="bg-gradient-to-b from-gray-100 to-gray-300 py-8 px-4 md:px-12 lg:px-32 min-h-[40vh] shadow-lg">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              width={280}
              alt=""
              className="w-[230px] sm:w-auto"
              priority
            />
          </Link>
          <button onClick={handleScroll} className="flex items-center gap-2 font-semibold py-2 px-5 rounded-lg border border-black bg-white shadow-md hover:bg-black hover:text-white transition ">
            Get Started <Image src={assets.arrow} alt="Arrow" />
          </button>
        </div>

        <div className="text-center my-24 ">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto ">
            {" "}
            {data.title}
          </h1>
          {data.authorImg && (
            <Image
              className="mx-auto mt-6 border border-white rounded-full"
              src={data.authorImg}
              width={60}
              height={60}
              alt=""
            />
          )}
          <p className="mt-2 pb-2 text-lg text-gray-700 font-medium max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          className="border-4 border-white"
          src={data.image}
          width={1280}
          height={720}
          alt=""
        />

       <div className="blog-content" dangerouslySetInnerHTML={{__html:data.description}}>

       </div>

          <div className="my-16">
            <p className="text-gray-800 font-semibold mb-4 text-lg">
              Share this article on Social Media
            </p>
            <div className="flex gap-6">
              <a href="#" aria-label="Share on Facebook">
                <Image
                  src={assets.facebook_icon}
                  width={50}
                  alt="Facebook"
                  className="hover:scale-110 transition-transform duration-200"
                />
              </a>
              <a href="#" aria-label="Share on Twitter">
                <Image
                  src={assets.twitter_icon}
                  width={50}
                  alt="Twitter"
                  className="hover:scale-110 transition-transform duration-200"
                />
              </a>
              <a href="#" aria-label="Share on Google Plus">
                <Image
                  src={assets.googleplus_icon}
                  width={50}
                  alt="Google Plus"
                  className="hover:scale-110 transition-transform duration-200"
                />
              </a>
            </div>
          </div>
        </div>
      
      <Footer />
    </>
  ) : (
    <div className="flex justify-center items-center min-h-[60vh]">
      <span className="text-gray-500 text-lg">Loading...</span>
    </div>
  );
};

export default page;