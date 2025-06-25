import { assets } from "@/Assests/assets";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Header() {
  const [email, setEmail] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post("/api/email", formData);

    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error("Error");
    }
  };

  // Scroll functions for each section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <>
      {/* Fixed Navigation Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200"
            : "bg-transparent"
        }`}
      >
        <div className="py-4 px-5 md:px-12 lg:px-28">
          <div className="flex justify-between items-center">
            <Image
              src={assets.logo}
              width={120}
              alt="Wellness Hub"
              className="w-[100px] sm:w-[120px] cursor-pointer"
              onClick={() => scrollToSection("home")}
            />

            {/* Desktop Navigation Menu */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
              <button
                onClick={() => scrollToSection("home")}
                className="relative hover:text-blue-600 transition-colors cursor-pointer group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection("sexual-health")}
                className="relative hover:text-blue-600 transition-colors cursor-pointer group"
              >
                Sexual Health
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection("mens-performance")}
                className="relative hover:text-blue-600 transition-colors cursor-pointer group"
              >
                Men's Performance
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection("womens-vitality")}
                className="relative hover:text-blue-600 transition-colors cursor-pointer group"
              >
                Women's Vitality
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection("art-of-intimacy")}
                className="relative hover:text-blue-600 transition-colors cursor-pointer group"
              >
                Art of Intimacy
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </nav>

            {/* CTA Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => scrollToSection("mid")}
                className="hidden sm:flex items-center gap-2 font-medium py-2 px-4 sm:py-3 sm:px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Started
                <Image
                  src={assets.arrow}
                  alt=""
                  width={12}
                  className="filter brightness-0 invert"
                />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span
                    className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${
                      isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
                    }`}
                  ></span>
                  <span
                    className={`block w-5 h-0.5 bg-gray-600 mt-1 transition-all duration-300 ${
                      isMobileMenuOpen ? "opacity-0" : ""
                    }`}
                  ></span>
                  <span
                    className={`block w-5 h-0.5 bg-gray-600 mt-1 transition-all duration-300 ${
                      isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <nav className="pt-4 pb-2 space-y-2">
              <button
                onClick={() => scrollToSection("home")}
                className="block w-full text-left py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("sexual-health")}
                className="block w-full text-left py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                Sexual Health
              </button>
              <button
                onClick={() => scrollToSection("mens-performance")}
                className="block w-full text-left py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                Men's Performance
              </button>
              <button
                onClick={() => scrollToSection("womens-vitality")}
                className="block w-full text-left py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                Women's Vitality
              </button>
              <button
                onClick={() => scrollToSection("art-of-intimacy")}
                className="block w-full text-left py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                Art of Intimacy
              </button>
              <button
                onClick={() => scrollToSection("mid")}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium mt-4 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Get Started
                <Image
                  src={assets.arrow}
                  alt=""
                  width={12}
                  className="filter brightness-0 invert"
                />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content with top padding to account for fixed header */}
      <div className="pt-20 sm:pt-24">
        <div className="py-5 px-5 md:px-12 lg:px-28">
          {/* Hero Section */}
          <div id="home" className="text-center my-16 sm:my-20">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
              <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
              <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
            </div>

            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6 animate-fade-in">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                Trusted by 2M+ members worldwide
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Better wellness,
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                  we got you
                </span>
              </h1>

              <p className="mt-6 max-w-[650px] mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed opacity-90">
                Expert guidance and premium solutions for your health and
                intimacy journey. Discreet, professional, and tailored for your
                needs.
              </p>

              {/* Trust Indicators with enhanced styling */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-12 text-sm text-gray-600">
                <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  2,000,000+ members treated
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Free and discreet shipping
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  100% online process
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  No insurance required
                </div>
              </div>

              {/* Enhanced Newsletter Signup */}
              <div className="mt-16 max-w-[500px] mx-auto">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Get personalized health tips
                </h3>
                <form
                  onSubmit={onSubmitHandler}
                  className="relative flex bg-white border-2 border-gray-200 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20"
                >
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 sm:py-5 outline-none text-gray-700 placeholder-gray-400 text-base"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-4 sm:py-5 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  No spam, unsubscribe at any time. Your privacy is protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #2563eb, #7c3aed);
        }
      `}</style>
    </>
  );
}

export const scrollToMid = () => {
  const element = document.getElementById("mid");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export default Header;
