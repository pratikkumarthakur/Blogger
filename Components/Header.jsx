// import { assets } from "@/Assests/assets";
// import axios from "axios";
// import Image from "next/image";
// import React, { useState } from "react";
// import { toast } from "react-toastify";

// function Header() {

//   const[email,setEmail]=useState("");

// const onSubmitHandler= async (e)=>{
// e.preventDefault();
// const formData = new FormData();
// formData.append("email",email);
// const response = await axios.post('/api/email',formData)

// if(response.data.success){
//   toast.success(response.data.msg);
//   setEmail("");
// }else{
//   toast.error("Error")
// }
// }

//   return (
//     <div className="py-5 px-5 md:px-12 lg:px-28">
//       <div className="flex justify-between items-center">
//         <Image
//           src={assets.logo}
//           width={280}
//           alt=""
//           className="w-[230px] sm:w-auto"
//         />
//         <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black cursor-pointer shadow-[-7px_7px_0px_#000000]">
//           Get Started <Image src={assets.arrow} alt="" />
//         </button>
//       </div>
//       <div className="text-center my-8">
//         <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
//         <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
//           Create and Upload your latest blogs here.
//         </p>
//         <form onSubmit={onSubmitHandler}
//           className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]"
//           action=""
//         >
//           <input onChange={(e)=>setEmail(e.target.value)} value={email}
//             type="email"
//             placeholder="Enter Your email"
//             className="pl-4 outline-none"
//           />
//           <button
//             type="submit"
//             className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white cursor-pointer"
//           >
//             Subscribe
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Header;


import { assets } from "@/Assests/assets";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Header() {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post('/api/email', formData);

    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      {/* Navigation Header */}
      <div className="flex justify-between items-center mb-8">
        <Image
          src={assets.logo}
          width={120}
          alt="Wellness Hub"
          className="w-[100px] sm:w-[120px]"
        />
        
        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/sexual-health" className="hover:text-blue-600 transition-colors">
            Sexual Health
          </Link>
          <Link href="/mens-performance" className="hover:text-blue-600 transition-colors">
            Men's Performance
          </Link>
          <Link href="/womens-vitality" className="hover:text-blue-600 transition-colors">
            Women's Vitality
          </Link>
          <Link href="/art-of-intimacy" className="hover:text-blue-600 transition-colors">
            Art of Intimacy
          </Link>
        </nav>

        <button className="flex items-center gap-2 font-medium py-2 px-4 sm:py-3 sm:px-6 bg-black text-white hover:bg-gray-800 transition-colors rounded-md">
          Get Started <Image src={assets.arrow} alt="" width={12} />
        </button>
      </div>

      {/* Hero Section */}
      <div className="text-center my-12">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          Better wellness,
          <br />
          <span className="text-blue-600">we got you</span>
        </h1>
        <p className="mt-6 max-w-[600px] mx-auto text-lg text-gray-600 leading-relaxed">
          Expert guidance and premium solutions for your health and intimacy journey. 
          Discreet, professional, and tailored for your needs.
        </p>
        
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            2,000,000+ members treated
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Free and discreet shipping
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            100% online process
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            No insurance required
          </div>
        </div>

        {/* Newsletter Signup */}
        <form 
          onSubmit={onSubmitHandler}
          className="flex justify-center max-w-[450px] mx-auto mt-12 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
        >
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
            type="email"
            placeholder="Enter your email for health tips"
            className="flex-1 px-6 py-4 outline-none text-gray-700"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-8 py-4 hover:bg-gray-800 transition-colors font-medium"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default Header;