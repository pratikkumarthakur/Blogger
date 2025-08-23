import { blog_data } from "@/Assests/assets";
import React, { useEffect, useState } from "react";
import Blogitem from "./Blogitem";
import axios from "axios";
import { scrollToMid } from "./Header";
import Link from "next/link";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog");
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
    { id: "Wellness Tips", label: "Wellness Tips" },
  ];

  return (
    <div className="py-12 px-5 md:px-12 lg:px-28">
      {/* Sexual Health Section */}
      <section id="sexual-health" className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Sexual Health
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive sexual health solutions designed for your comfort and
            confidence. Our expert-approved treatments address common concerns
            with discretion and effectiveness.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              ED Treatment
            </h3>
            <p className="text-gray-600 mb-6">
              Effective solutions for erectile dysfunction with personalized
              treatment plans. FDA-approved medications and expert
              consultations.
            </p>
            <Link href="/treatments/ed-treatment">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Read Full Article →
              </button>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Premature Ejaculation
            </h3>
            <p className="text-gray-600 mb-6">
              Clinically proven treatments to improve control and satisfaction.
              Topical solutions and expert behavioral guidance.
            </p>
            <Link href="/treatments/premature-ejaculation">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                Read Full Article →
              </button>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-8 border border-teal-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Sexual Wellness
            </h3>
            <p className="text-gray-600 mb-6">
              Comprehensive approach to overall sexual health and wellbeing.
              Holistic solutions for long-term satisfaction.
            </p>
            <Link href="/treatments/sexual-wellness">
              <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium">
                Read Full Article →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Men's Performance Section */}
      <section id="mens-performance" className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Men's Performance
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Boost your confidence and performance with our scientifically-backed
            solutions. Tailored treatments for the modern man's health and
            vitality needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl p-8 border border-red-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Performance Enhancement
              <span className="text-sm bg-red-500 text-white px-2 py-1 rounded-full ml-2">
                Popular
              </span>
            </h3>
            <p className="text-gray-600 mb-6">
              Advanced formulations to enhance stamina and performance
              naturally. Natural boosters and confidence coaching included.
            </p>
            <Link href="/treatments/performance-enhancement">
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
                Read Full Article →
              </button>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Testosterone Support
            </h3>
            <p className="text-gray-600 mb-6">
              Natural support for healthy testosterone levels and energy.
              Comprehensive hormone testing and lifestyle coaching.
            </p>
            <Link href="/treatments/testosterone-support">
              <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium">
                Read Full Article →
              </button>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Vitality & Energy
            </h3>
            <p className="text-gray-600 mb-6">
              Comprehensive wellness solutions for sustained energy and
              vitality. Energy assessment and metabolic support included.
            </p>
            <Link href="/treatments/vitality-energy">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
                Read Full Article →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Women's Vitality Section */}
      <section id="womens-vitality" className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Women's Vitality
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Empowering women's health with personalized solutions for every
            stage of life. From hormonal balance to intimate wellness, we've got
            you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-pink-50 to-rose-100 rounded-2xl p-8 border border-pink-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Hormonal Balance
            </h3>
            <p className="text-gray-600 mb-6">
              Support for natural hormonal balance and menstrual health.
              Comprehensive hormone testing and natural supplements.
            </p>
            <Link href="/treatments/hormonal-balance">
              <button className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium">
                Read Full Article →
              </button>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-2xl p-8 border border-violet-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Intimate Wellness
            </h3>
            <p className="text-gray-600 mb-6">
              Comprehensive solutions for intimate comfort and confidence. pH
              balance support and expert guidance included.
            </p>
            <Link href="/treatments/intimate-wellness">
              <button className="bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors font-medium">
                Read Full Article →
              </button>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 border border-indigo-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Fertility Support
            </h3>
            <p className="text-gray-600 mb-6">
              Natural fertility support and reproductive health solutions.
              Preconception care and ovulation support included.
            </p>
            <Link href="/treatments/fertility-support">
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                Read Full Article →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Art of Intimacy Section */}
      <section id="art-of-intimacy" className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Art of Intimacy
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Enhance your intimate relationships with expert guidance and premium
            solutions. Building deeper connections through better understanding
            and communication.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-2xl p-8 border border-amber-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Relationship Wellness
            </h3>
            <p className="text-gray-600 mb-6">
              Professional guidance for stronger, more intimate relationships.
              Couple's assessment and communication tools included.
            </p>
            <Link href="/treatments/relationship-wellness">
              <button className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium">
                Read Full Article →
              </button>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 border border-emerald-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Communication Skills
            </h3>
            <p className="text-gray-600 mb-6">
              Learn effective communication techniques for intimate
              conversations. Active listening and vulnerability skills training.
            </p>
            <Link href="/treatments/communication-skills">
              <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                Read Full Article →
              </button>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-8 border border-cyan-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Daily Rise Program
            </h3>
            <p className="text-gray-600 mb-6">
              Comprehensive daily wellness program for better intimacy. Morning
              routines and mindfulness exercises included.
            </p>
            <Link href="/treatments/daily-rise">
              <button className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors font-medium">
                Read Full Article →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Explore Our Health Topics
        </h2>
      </div>

      {/* Featured Solutions Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Weight Management Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Lose weight with GLP-1s
          </h3>
          <p className="text-gray-600 mb-6">
            Clinically proven weight management solutions with personalized
            treatment plans and expert medical supervision.
          </p>
          <Link href="/treatments/weight-management">
            <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
              Read Full Article →
            </button>
          </Link>
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
            Boost confidence and performance with our expert-recommended
            solutions and comprehensive enhancement programs.
          </p>
          <Link href="/treatments/enhanced-performance">
            <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
              Read Full Article →
            </button>
          </Link>
        </div>
      </div>

      {/* Additional Treatment Options */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <h4 className="font-semibold mb-2 text-gray-800">
            Access Zepbound® in a vial
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            Advanced weight management therapy with personalized dosing and
            medical support.
          </p>
          <Link href="/treatments/zepbound-therapy">
            <button className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Read Full Article →
            </button>
          </Link>
        </div>

        <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
          <h4 className="font-semibold mb-2 text-gray-800">
            Have better intimacy with Daily Rise
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            Comprehensive relationship wellness program with daily practices and
            expert guidance.
          </p>
          <Link href="/treatments/daily-rise-intimacy">
            <button className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Read Full Article →
            </button>
          </Link>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h4 className="font-semibold mb-2 text-gray-800">
            Regrow your confidence
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            Hair restoration and wellness solutions with proven results and
            expert care.
          </p>
          <Link href="/treatments/hair-restoration">
            <button className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Read Full Article →
            </button>
          </Link>
        </div>
      </div>

      {/* Blog Articles Grid */}
      <div>
        <h2 id="mid" className="text-3xl font-bold text-center mb-8">
          Latest Health Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs
            .filter((item) => (menu === "All" ? true : item.category === menu))
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
