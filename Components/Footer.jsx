// import { assets } from '@/Assests/assets'
// import Image from 'next/image'
// import React from 'react'

// const Footer = () => {
//   return (
//     <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center'>
// <Image src={assets.logo_light} alt='' width={120}  />
// <p className='text-sm text-white'>All right reserved. Copyright @blogger</p>
// <div className='flex'>
// <Image src={assets.facebook_icon} alt='' width={40} />
// <Image src={assets.twitter_icon} alt='' width={40} />
// <Image src={assets.googleplus_icon} alt='' width={40} />
// </div>
//     </div>
//   )
// }

// export default Footer

import { assets } from '@/Assests/assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="px-5 md:px-12 lg:px-28 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Image src={assets.logo_light} alt="Wellness Hub" width={120} className="mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your trusted partner in health, wellness, and intimate care. Professional, 
              discreet, and personalized solutions for better living.
            </p>
            <div className="flex gap-3">
              <Image src={assets.facebook_icon} alt="Facebook" width={32} className="hover:opacity-80 cursor-pointer" />
              <Image src={assets.twitter_icon} alt="Twitter" width={32} className="hover:opacity-80 cursor-pointer" />
              <Image src={assets.googleplus_icon} alt="Google Plus" width={32} className="hover:opacity-80 cursor-pointer" />
            </div>
          </div>

          {/* Health Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Health Topics</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/sexual-health" className="text-gray-400 hover:text-white transition-colors">Sexual Health</Link></li>
              <li><Link href="/mens-performance" className="text-gray-400 hover:text-white transition-colors">Men's Performance</Link></li>
              <li><Link href="/womens-vitality" className="text-gray-400 hover:text-white transition-colors">Women's Vitality</Link></li>
              <li><Link href="/art-of-intimacy" className="text-gray-400 hover:text-white transition-colors">Art of Intimacy</Link></li>
              <li><Link href="/wellness-tips" className="text-gray-400 hover:text-white transition-colors">Wellness Tips</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/weight-management" className="text-gray-400 hover:text-white transition-colors">Weight Management</Link></li>
              <li><Link href="/performance-enhancement" className="text-gray-400 hover:text-white transition-colors">Performance Enhancement</Link></li>
              <li><Link href="/hair-restoration" className="text-gray-400 hover:text-white transition-colors">Hair Restoration</Link></li>
              <li><Link href="/daily-wellness" className="text-gray-400 hover:text-white transition-colors">Daily Wellness</Link></li>
              <li><Link href="/consultation" className="text-gray-400 hover:text-white transition-colors">Online Consultation</Link></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-wrap justify-center gap-8 text-xs text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              FDA-Approved Treatments
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Licensed Healthcare Providers
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              HIPAA Compliant
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              256-bit SSL Encryption
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 px-5 md:px-12 lg:px-28">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2024 Wellness Hub. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link href="/medical-disclaimer" className="hover:text-white transition-colors">
              Medical Disclaimer
            </Link>
            <Link href="/shipping-info" className="hover:text-white transition-colors">
              Shipping Info
            </Link>
            <Link href="/returns" className="hover:text-white transition-colors">
              Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;