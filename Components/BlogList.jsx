import { blog_data } from "@/Assests/assets";
import React, { useEffect, useState } from "react";
import Blogitem from "./Blogitem";
import axios from "axios";
import { scrollToMid } from "./Header";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog");
    setBlogs(response.data.blogs);
    console.log(response.data.blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Modal content data
  const modalData = {
    "ed-treatment": {
      title: "ED Treatment Solutions",
      content: `
        <h3 class="text-xl font-semibold mb-4">Effective Erectile Dysfunction Treatment</h3>
        <p class="mb-4">Our comprehensive ED treatment approach includes:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>FDA-Approved Medications:</strong> Including sildenafil, tadalafil, and vardenafil</li>
          <li><strong>Personalized Dosing:</strong> Tailored to your specific needs and health profile</li>
          <li><strong>Discreet Consultation:</strong> Private online consultations with licensed physicians</li>
          <li><strong>Fast Delivery:</strong> Medications delivered directly to your door</li>
        </ul>
        <p class="mb-4">Our treatments have helped over 500,000 men regain confidence with a 95% satisfaction rate.</p>
        <div class="bg-blue-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Starting from $20/month</strong> - No insurance required</p>
        </div>
      `,
    },
    "premature-ejaculation": {
      title: "Premature Ejaculation Treatment",
      content: `
        <h3 class="text-xl font-semibold mb-4">Proven PE Treatment Options</h3>
        <p class="mb-4">Comprehensive solutions for better control and satisfaction:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Topical Solutions:</strong> Delay sprays and wipes for immediate effect</li>
          <li><strong>Oral Medications:</strong> Sertraline and other selective treatments</li>
          <li><strong>Behavioral Techniques:</strong> Expert guidance on proven methods</li>
          <li><strong>Combination Therapy:</strong> Customized treatment plans for best results</li>
        </ul>
        <p class="mb-4">Clinical studies show 78% improvement in control within 4 weeks of treatment.</p>
        <div class="bg-purple-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Starting from $15/month</strong> - Free consultation included</p>
        </div>
      `,
    },
    "sexual-wellness": {
      title: "Complete Sexual Wellness",
      content: `
        <h3 class="text-xl font-semibold mb-4">Holistic Sexual Health Approach</h3>
        <p class="mb-4">Our comprehensive wellness program includes:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Health Assessment:</strong> Complete evaluation of physical and mental factors</li>
          <li><strong>Lifestyle Optimization:</strong> Diet, exercise, and stress management guidance</li>
          <li><strong>Supplement Support:</strong> Evidence-based nutritional supplements</li>
          <li><strong>Ongoing Monitoring:</strong> Regular check-ins and treatment adjustments</li>
        </ul>
        <p class="mb-4">Addresses root causes for long-term sexual health and satisfaction.</p>
        <div class="bg-teal-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Complete package from $45/month</strong> - Includes consultation & supplements</p>
        </div>
      `,
    },
    "performance-enhancement": {
      title: "Performance Enhancement Program",
      content: `
        <h3 class="text-xl font-semibold mb-4">Advanced Performance Solutions</h3>
        <p class="mb-4">Boost your confidence with our proven enhancement program:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Natural Boosters:</strong> L-Arginine, Ginseng, and other proven ingredients</li>
          <li><strong>Stamina Training:</strong> Personalized exercise and breathing techniques</li>
          <li><strong>Confidence Coaching:</strong> Mental performance and anxiety management</li>
          <li><strong>Progress Tracking:</strong> Regular assessments and plan adjustments</li>
        </ul>
        <p class="mb-4">Over 300,000 men have improved their performance using our methods.</p>
        <div class="bg-red-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Most Popular Plan - $35/month</strong> - 30-day money-back guarantee</p>
        </div>
      `,
    },
    "testosterone-support": {
      title: "Testosterone Support Therapy",
      content: `
        <h3 class="text-xl font-semibold mb-4">Natural Testosterone Optimization</h3>
        <p class="mb-4">Support healthy testosterone levels naturally:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Lab Testing:</strong> Comprehensive hormone panel analysis</li>
          <li><strong>Natural Supplements:</strong> Zinc, Vitamin D, Ashwagandha complex</li>
          <li><strong>Lifestyle Coaching:</strong> Sleep, diet, and exercise optimization</li>
          <li><strong>Progress Monitoring:</strong> Regular testing to track improvements</li>
        </ul>
        <p class="mb-4">Average 23% increase in testosterone levels within 12 weeks.</p>
        <div class="bg-orange-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Starting from $55/month</strong> - Includes lab work & supplements</p>
        </div>
      `,
    },
    "vitality-energy": {
      title: "Vitality & Energy Program",
      content: `
        <h3 class="text-xl font-semibold mb-4">Complete Vitality Restoration</h3>
        <p class="mb-4">Comprehensive approach to sustained energy and vitality:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Energy Assessment:</strong> Identify underlying causes of fatigue</li>
          <li><strong>Metabolic Support:</strong> B-complex, CoQ10, and adaptogens</li>
          <li><strong>Recovery Optimization:</strong> Sleep quality and stress management</li>
          <li><strong>Fitness Integration:</strong> Personalized exercise recommendations</li>
        </ul>
        <p class="mb-4">92% of clients report significant energy improvement within 6 weeks.</p>
        <div class="bg-green-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Complete program $40/month</strong> - Free energy assessment included</p>
        </div>
      `,
    },
    "hormonal-balance": {
      title: "Women's Hormonal Balance",
      content: `
        <h3 class="text-xl font-semibold mb-4">Natural Hormone Balance Solutions</h3>
        <p class="mb-4">Restore hormonal harmony with our specialized approach:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Hormone Testing:</strong> Comprehensive panel including estrogen, progesterone, cortisol</li>
          <li><strong>Natural Support:</strong> Chasteberry, evening primrose, and adaptogenic herbs</li>
          <li><strong>Cycle Tracking:</strong> Personalized cycle optimization and symptom management</li>
          <li><strong>Nutritional Guidance:</strong> Hormone-supporting diet and lifestyle changes</li>
        </ul>
        <p class="mb-4">89% improvement in hormonal symptoms within 8 weeks of treatment.</p>
        <div class="bg-pink-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Starting from $45/month</strong> - Includes testing & supplements</p>
        </div>
      `,
    },
    "intimate-wellness": {
      title: "Women's Intimate Wellness",
      content: `
        <h3 class="text-xl font-semibold mb-4">Complete Intimate Health Solutions</h3>
        <p class="mb-4">Comprehensive care for intimate comfort and confidence:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Vaginal Health:</strong> pH balance support and microbiome optimization</li>
          <li><strong>Comfort Solutions:</strong> Natural lubricants and moisturizers</li>
          <li><strong>Sensitivity Support:</strong> Gentle formulations for sensitive skin</li>
          <li><strong>Educational Resources:</strong> Expert guidance on intimate wellness</li>
        </ul>
        <p class="mb-4">Trusted by over 150,000 women for intimate health needs.</p>
        <div class="bg-violet-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Wellness kit from $25/month</strong> - Discreet packaging guaranteed</p>
        </div>
      `,
    },
    "fertility-support": {
      title: "Fertility Support Program",
      content: `
        <h3 class="text-xl font-semibold mb-4">Natural Fertility Enhancement</h3>
        <p class="mb-4">Support your fertility journey with evidence-based solutions:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Preconception Care:</strong> Folic acid, CoQ10, and fertility vitamins</li>
          <li><strong>Ovulation Support:</strong> Natural cycle regulation and tracking</li>
          <li><strong>Nutritional Optimization:</strong> Fertility-boosting diet and supplements</li>
          <li><strong>Stress Management:</strong> Meditation and wellness practices for conception</li>
        </ul>
        <p class="mb-4">Helping couples on their fertility journey with personalized care.</p>
        <div class="bg-indigo-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Comprehensive program $60/month</strong> - Includes consultation & supplements</p>
        </div>
      `,
    },
    "relationship-wellness": {
      title: "Relationship Wellness Program",
      content: `
        <h3 class="text-xl font-semibold mb-4">Strengthen Your Intimate Connection</h3>
        <p class="mb-4">Professional guidance for deeper, more satisfying relationships:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Couple's Assessment:</strong> Relationship health evaluation and goal setting</li>
          <li><strong>Communication Tools:</strong> Techniques for better intimate conversations</li>
          <li><strong>Intimacy Building:</strong> Exercises and practices for deeper connection</li>
          <li><strong>Conflict Resolution:</strong> Healthy ways to navigate relationship challenges</li>
        </ul>
        <p class="mb-4">Couples report 85% improvement in relationship satisfaction.</p>
        <div class="bg-amber-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Program starting $75/month</strong> - Includes couple's sessions</p>
        </div>
      `,
    },
    "communication-skills": {
      title: "Intimate Communication Mastery",
      content: `
        <h3 class="text-xl font-semibold mb-4">Master the Art of Intimate Communication</h3>
        <p class="mb-4">Learn effective communication for better intimacy:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Active Listening:</strong> Techniques for deeper understanding and connection</li>
          <li><strong>Vulnerability Skills:</strong> Safe ways to share feelings and desires</li>
          <li><strong>Difficult Conversations:</strong> Navigating sensitive topics with confidence</li>
          <li><strong>Non-Verbal Communication:</strong> Understanding and using body language effectively</li>
        </ul>
        <p class="mb-4">Practical skills that transform relationships and build lasting intimacy.</p>
        <div class="bg-emerald-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Course starting $50/month</strong> - Self-paced online modules</p>
        </div>
      `,
    },
    "daily-rise": {
      title: "Daily Rise Intimacy Program",
      content: `
        <h3 class="text-xl font-semibold mb-4">Transform Your Daily Intimacy</h3>
        <p class="mb-4">Comprehensive daily program for better intimate relationships:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Morning Routines:</strong> Daily practices to connect with your partner</li>
          <li><strong>Mindfulness Exercises:</strong> Present-moment awareness for better intimacy</li>
          <li><strong>Evening Rituals:</strong> Wind-down practices that bring couples closer</li>
          <li><strong>Weekly Challenges:</strong> Fun activities to explore and grow together</li>
        </ul>
        <p class="mb-4">Join thousands of couples transforming their daily connection.</p>
        <div class="bg-cyan-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Full program $40/month</strong> - 30-day free trial available</p>
        </div>
      `,
    },
  };

  const openModal = (contentKey) => {
    setModalContent(modalData[contentKey]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent({});
  };

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
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {modalContent.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <div
                className="text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: modalContent.content }}
              />
              <div className="mt-6 flex gap-4">
                <button
                  onClick={closeModal}
                  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Get Started Now
                </button>
                <button
                  onClick={closeModal}
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
              treatment plans.
            </p>
            <button
              onClick={() => openModal("ed-treatment")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Learn More →
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Premature Ejaculation
            </h3>
            <p className="text-gray-600 mb-6">
              Clinically proven treatments to improve control and satisfaction.
            </p>
            <button
              onClick={() => openModal("premature-ejaculation")}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Learn More →
            </button>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-8 border border-teal-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Sexual Wellness
            </h3>
            <p className="text-gray-600 mb-6">
              Comprehensive approach to overall sexual health and wellbeing.
            </p>
            <button
              onClick={() => openModal("sexual-wellness")}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Learn More →
            </button>
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
              naturally.
            </p>
            <button
              onClick={() => openModal("performance-enhancement")}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Get Started →
            </button>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Testosterone Support
            </h3>
            <p className="text-gray-600 mb-6">
              Natural support for healthy testosterone levels and energy.
            </p>
            <button
              onClick={() => openModal("testosterone-support")}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              Learn More →
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Vitality & Energy
            </h3>
            <p className="text-gray-600 mb-6">
              Comprehensive wellness solutions for sustained energy and
              vitality.
            </p>
            <button
              onClick={() => openModal("vitality-energy")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Learn More →
            </button>
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
            </p>
            <button
              onClick={() => openModal("hormonal-balance")}
              className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium"
            >
              Learn More →
            </button>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-2xl p-8 border border-violet-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Intimate Wellness
            </h3>
            <p className="text-gray-600 mb-6">
              Comprehensive solutions for intimate comfort and confidence.
            </p>
            <button
              onClick={() => openModal("intimate-wellness")}
              className="bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors font-medium"
            >
              Learn More →
            </button>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 border border-indigo-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Fertility Support
            </h3>
            <p className="text-gray-600 mb-6">
              Natural fertility support and reproductive health solutions.
            </p>
            <button
              onClick={() => openModal("fertility-support")}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Learn More →
            </button>
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
            </p>
            <button
              onClick={() => openModal("relationship-wellness")}
              className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
            >
              Learn More →
            </button>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 border border-emerald-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Communication Skills
            </h3>
            <p className="text-gray-600 mb-6">
              Learn effective communication techniques for intimate
              conversations.
            </p>
            <button
              onClick={() => openModal("communication-skills")}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              Learn More →
            </button>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-8 border border-cyan-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Daily Rise Program
            </h3>
            <p className="text-gray-600 mb-6">
              Comprehensive daily wellness program for better intimacy.
            </p>
            <button
              onClick={() => openModal("daily-rise")}
              className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors font-medium"
            >
              Get Started →
            </button>
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
            treatment plans.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
            Get Started →
          </button>
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
            solutions.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
            Get Started →
          </button>
        </div>
      </div>

      {/* Additional Treatment Options */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <h4 className="font-semibold mb-2 text-gray-800">
            Access Zepbound® in a vial
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            Advanced weight management therapy
          </p>
          <button className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            Learn More →
          </button>
        </div>

        <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
          <h4 className="font-semibold mb-2 text-gray-800">
            Have better intimacy with Daily Rise
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            Comprehensive relationship wellness
          </p>
          <button className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            Learn More →
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h4 className="font-semibold mb-2 text-gray-800">
            Regrow your confidence
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            Hair restoration and wellness solutions
          </p>
          <button className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            Learn More →
          </button>
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
