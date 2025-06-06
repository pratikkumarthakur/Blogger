// import { assets, blog_data } from '@/Assests/assets'
// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// function Blogitem({title,description,category,image,id}) {
//   return (
//     <div className='max-w-[330px] sm:mx-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000]'>
//       <Link href={`/blogs/${id}`}>
//         <Image src={image} alt='' width={400} height={400} className='border-b border-black' />
//         </Link>
//         <p className='ml-5 mt-5 px-1 inline-block bg-black text-white text-sm'>{category}</p>
//         <div className="p-5">
//             <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900'>{title}</h5>
//             <p className='mb-3 text-sm tracking-tight text-gray-700' dangerouslySetInnerHTML={{__html:description.slice(0,120)}}>

//             </p>
//             <Link href={`/blogs/${id}`} className='inline-flex items-center py-2 font-semibold text-center'>
//                 Read more <Image src={assets.arrow} className='ml-2' alt='' width={12}/>
//             </Link>
//         </div>

//     </div>
//   )
// }

// export default Blogitem

import { assets, blog_data } from '@/Assests/assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Blogitem({ title, description, category, image, id }) {
  // Color mapping for different health categories
  const getCategoryColor = (category) => {
    const colorMap = {
      'Sexual Health': 'bg-red-500',
      "Men's Performance": 'bg-blue-500',
      "Women's Vitality": 'bg-pink-500',
      'Art of Intimacy': 'bg-purple-500',
      'Wellness Tips': 'bg-green-500',
      'Weight Management': 'bg-orange-500',
      'default': 'bg-gray-700'
    };
    return colorMap[category] || colorMap.default;
  };

  const getBorderColor = (category) => {
    const colorMap = {
      'Sexual Health': 'border-red-200',
      "Men's Performance": 'border-blue-200',
      "Women's Vitality": 'border-pink-200',
      'Art of Intimacy': 'border-purple-200',
      'Wellness Tips': 'border-green-200',
      'Weight Management': 'border-orange-200',
      'default': 'border-gray-200'
    };
    return colorMap[category] || colorMap.default;
  };

  return (
    <div className={`max-w-[400px] bg-white rounded-2xl border-2 ${getBorderColor(category)} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}>
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
            <span className={`${getCategoryColor(category)} text-white text-xs font-semibold py-2 px-3 rounded-full shadow-lg`}>
              {category}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-6">
        <h5 className="mb-3 text-xl font-bold tracking-tight text-gray-900 leading-tight hover:text-blue-600 transition-colors">
          <Link href={`/blogs/${id}`}>
            {title}
          </Link>
        </h5>
        
        <p 
          className="mb-4 text-gray-600 leading-relaxed text-sm"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 140) + '...' }}
        />
        
        <Link 
          href={`/blogs/${id}`} 
          className="inline-flex items-center text-black font-semibold hover:text-blue-600 transition-colors group"
        >
          Read Full Article 
          <Image 
            src={assets.arrow} 
            className="ml-2 group-hover:translate-x-1 transition-transform" 
            alt="" 
            width={12}
          />
        </Link>
      </div>
    </div>
  );
}

export default Blogitem;