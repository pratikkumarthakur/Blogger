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
    "web-development": {
      title: "Web Development Mastery",
      content: `
        <h3 class="text-xl font-semibold mb-4">Complete Web Development Guide</h3>
        <p class="mb-4">Master modern web development with our comprehensive resources:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Frontend Technologies:</strong> React, Vue.js, Angular, and modern JavaScript</li>
          <li><strong>Backend Development:</strong> Node.js, Python, and database design</li>
          <li><strong>DevOps & Deployment:</strong> Cloud services, CI/CD, and containerization</li>
          <li><strong>Best Practices:</strong> Code quality, testing, and performance optimization</li>
        </ul>
        <p class="mb-4">Join over 50,000 developers who have enhanced their skills with our tutorials.</p>
        <div class="bg-blue-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Free tutorials available</strong> - Premium courses from $29/month</p>
        </div>
      `,
    },
    "digital-marketing": {
      title: "Digital Marketing Strategies",
      content: `
        <h3 class="text-xl font-semibold mb-4">Proven Digital Marketing Techniques</h3>
        <p class="mb-4">Comprehensive digital marketing solutions for modern businesses:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>SEO & Content:</strong> Organic traffic growth and content strategies</li>
          <li><strong>Social Media:</strong> Platform-specific marketing and engagement tactics</li>
          <li><strong>Paid Advertising:</strong> Google Ads, Facebook Ads, and ROI optimization</li>
          <li><strong>Analytics & Tracking:</strong> Data-driven marketing decisions</li>
        </ul>
        <p class="mb-4">Strategies that have helped businesses increase traffic by 300% on average.</p>
        <div class="bg-purple-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Marketing toolkit from $39/month</strong> - Free consultation included</p>
        </div>
      `,
    },
    "productivity-tools": {
      title: "Ultimate Productivity Suite",
      content: `
        <h3 class="text-xl font-semibold mb-4">Maximize Your Daily Productivity</h3>
        <p class="mb-4">Transform your workflow with proven productivity systems:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Task Management:</strong> Advanced project organization and priority systems</li>
          <li><strong>Time Tracking:</strong> Detailed analytics on your work patterns</li>
          <li><strong>Goal Setting:</strong> SMART goals framework and progress tracking</li>
          <li><strong>Automation Tools:</strong> Streamline repetitive tasks and workflows</li>
        </ul>
        <p class="mb-4">Users report 40% increase in productivity within the first month.</p>
        <div class="bg-teal-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Complete suite from $19/month</strong> - 14-day free trial</p>
        </div>
      `,
    },
    "fitness-nutrition": {
      title: "Fitness & Nutrition Program",
      content: `
        <h3 class="text-xl font-semibold mb-4">Complete Health & Fitness Solution</h3>
        <p class="mb-4">Achieve your fitness goals with our comprehensive program:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Custom Workouts:</strong> Personalized exercise plans for all fitness levels</li>
          <li><strong>Nutrition Planning:</strong> Meal prep guides and macro tracking</li>
          <li><strong>Progress Tracking:</strong> Detailed analytics and milestone celebrations</li>
          <li><strong>Community Support:</strong> Connect with like-minded fitness enthusiasts</li>
        </ul>
        <p class="mb-4">Over 100,000 members have achieved their fitness goals with our program.</p>
        <div class="bg-red-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Premium membership $29/month</strong> - 30-day money-back guarantee</p>
        </div>
      `,
    },
    "financial-planning": {
      title: "Smart Financial Planning",
      content: `
        <h3 class="text-xl font-semibold mb-4">Master Your Personal Finances</h3>
        <p class="mb-4">Build wealth and financial security with expert guidance:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Budget Management:</strong> Smart budgeting tools and expense tracking</li>
          <li><strong>Investment Strategies:</strong> Portfolio diversification and risk assessment</li>
          <li><strong>Debt Management:</strong> Proven strategies to eliminate debt faster</li>
          <li><strong>Retirement Planning:</strong> Long-term wealth building strategies</li>
        </ul>
        <p class="mb-4">Average user saves $2,400 more per year using our financial tools.</p>
        <div class="bg-orange-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Financial toolkit from $15/month</strong> - Free budget calculator</p>
        </div>
      `,
    },
    "creative-design": {
      title: "Creative Design Mastery",
      content: `
        <h3 class="text-xl font-semibold mb-4">Unleash Your Creative Potential</h3>
        <p class="mb-4">Master design principles and creative tools:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Design Fundamentals:</strong> Color theory, typography, and composition</li>
          <li><strong>Digital Tools:</strong> Adobe Creative Suite and modern design software</li>
          <li><strong>Brand Identity:</strong> Logo design and brand development strategies</li>
          <li><strong>Portfolio Building:</strong> Showcase your work professionally</li>
        </ul>
        <p class="mb-4">92% of students successfully launched their design careers within 6 months.</p>
        <div class="bg-green-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Design course bundle $59/month</strong> - Student discounts available</p>
        </div>
      `,
    },
    "travel-planning": {
      title: "Ultimate Travel Planning",
      content: `
        <h3 class="text-xl font-semibold mb-4">Plan Your Perfect Adventure</h3>
        <p class="mb-4">Comprehensive travel planning resources and tools:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Destination Guides:</strong> Detailed insights for over 500 destinations</li>
          <li><strong>Budget Planning:</strong> Cost estimation and money-saving tips</li>
          <li><strong>Itinerary Builder:</strong> Custom trip planning with local recommendations</li>
          <li><strong>Travel Safety:</strong> Health and security information for every country</li>
        </ul>
        <p class="mb-4">Trusted by over 200,000 travelers for their dream vacations.</p>
        <div class="bg-pink-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Travel toolkit from $25/month</strong> - Offline guides included</p>
        </div>
      `,
    },
    "cooking-recipes": {
      title: "Culinary Mastery Program",
      content: `
        <h3 class="text-xl font-semibold mb-4">Master the Art of Cooking</h3>
        <p class="mb-4">From beginner to chef with our comprehensive cooking program:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Recipe Collection:</strong> Over 5,000 tested recipes from around the world</li>
          <li><strong>Cooking Techniques:</strong> Step-by-step video tutorials and tips</li>
          <li><strong>Meal Planning:</strong> Weekly menus and shopping lists</li>
          <li><strong>Dietary Options:</strong> Vegetarian, vegan, keto, and allergy-friendly recipes</li>
        </ul>
        <p class="mb-4">Join 150,000+ home cooks improving their culinary skills.</p>
        <div class="bg-violet-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Recipe membership $19/month</strong> - 1000+ free recipes available</p>
        </div>
      `,
    },
    "online-learning": {
      title: "Online Learning Platform",
      content: `
        <h3 class="text-xl font-semibold mb-4">Expand Your Knowledge</h3>
        <p class="mb-4">Access world-class education from anywhere:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Course Library:</strong> Over 10,000 courses in 50+ categories</li>
          <li><strong>Expert Instructors:</strong> Learn from industry professionals and academics</li>
          <li><strong>Certification:</strong> Earn recognized certificates and badges</li>
          <li><strong>Learning Paths:</strong> Structured programs for career advancement</li>
        </ul>
        <p class="mb-4">Million+ students have advanced their careers through our platform.</p>
        <div class="bg-indigo-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Unlimited access from $49/month</strong> - Free courses available</p>
        </div>
      `,
    },
    "business-growth": {
      title: "Business Growth Strategies",
      content: `
        <h3 class="text-xl font-semibold mb-4">Scale Your Business</h3>
        <p class="mb-4">Proven strategies for sustainable business growth:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Market Analysis:</strong> Competitor research and market opportunity identification</li>
          <li><strong>Sales Strategies:</strong> Proven sales funnels and conversion optimization</li>
          <li><strong>Team Building:</strong> Hiring, training, and leadership development</li>
          <li><strong>Financial Management:</strong> Cash flow optimization and growth funding</li>
        </ul>
        <p class="mb-4">Our strategies have helped businesses grow revenue by 250% on average.</p>
        <div class="bg-amber-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Business toolkit from $99/month</strong> - Free consultation included</p>
        </div>
      `,
    },
    "mindfulness-wellness": {
      title: "Mindfulness & Wellness",
      content: `
        <h3 class="text-xl font-semibold mb-4">Find Balance and Inner Peace</h3>
        <p class="mb-4">Comprehensive wellness program for mind and body:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Meditation Practices:</strong> Guided sessions for all experience levels</li>
          <li><strong>Stress Management:</strong> Proven techniques for anxiety and stress relief</li>
          <li><strong>Sleep Optimization:</strong> Better sleep habits and relaxation techniques</li>
          <li><strong>Daily Wellness:</strong> Habits and routines for sustainable wellbeing</li>
        </ul>
        <p class="mb-4">85% of users report improved mental health within 30 days.</p>
        <div class="bg-emerald-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Wellness program $24/month</strong> - 7-day free trial</p>
        </div>
      `,
    },
    "content-creation": {
      title: "Content Creation Mastery",
      content: `
        <h3 class="text-xl font-semibold mb-4">Build Your Content Empire</h3>
        <p class="mb-4">Everything you need to create engaging content:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Content Strategy:</strong> Planning and scheduling for maximum engagement</li>
          <li><strong>Video Production:</strong> Equipment guides and editing techniques</li>
          <li><strong>Writing Skills:</strong> Copywriting and storytelling fundamentals</li>
          <li><strong>Monetization:</strong> Turn your content into sustainable income</li>
        </ul>
        <p class="mb-4">Join thousands of successful content creators building their brands.</p>
        <div class="bg-cyan-50 p-4 rounded-lg">
          <p class="text-sm"><strong>Creator toolkit $35/month</strong> - Content templates included</p>
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
    { id: "Technology", label: "Technology" },
    { id: "Lifestyle", label: "Lifestyle" },
    { id: "Travel", label: "Travel" },
    { id: "Food & Recipes", label: "Food & Recipes" },
    { id: "Business", label: "Business" },
    { id: "Health & Fitness", label: "Health & Fitness" },
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

      {/* Technology Section */}
      <section id="technology" className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Technology & Development
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay ahead in the digital world with cutting-edge technology
            insights, development tutorials, and industry best practices from
            leading experts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Web Development
            </h3>
            <p className="text-gray-600 mb-6">
              Master modern web technologies with comprehensive tutorials and
              guides.
            </p>
            <button
              onClick={() => openModal("web-development")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Learn More →
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Digital Marketing
            </h3>
            <p className="text-gray-600 mb-6">
              Grow your online presence with proven digital marketing
              strategies.
            </p>
            <button
              onClick={() => openModal("digital-marketing")}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Learn More →
            </button>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-8 border border-teal-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Productivity Tools
            </h3>
            <p className="text-gray-600 mb-6">
              Optimize your workflow with advanced productivity systems and
              tools.
            </p>
            <button
              onClick={() => openModal("productivity-tools")}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Learn More →
            </button>
          </div>
        </div>
      </section>

      {/* Lifestyle Section */}
      <section id="lifestyle" className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Lifestyle & Wellness
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your daily life with expert tips on fitness, nutrition,
            mindfulness, and personal development for a healthier, happier you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl p-8 border border-red-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Fitness & Nutrition
              <span className="text-sm bg-red-500 text-white px-2 py-1 rounded-full ml-2">
                Popular
              </span>
            </h3>
            <p className="text-gray-600 mb-6">
              Achieve your health goals with personalized fitness and nutrition
              plans.
            </p>
            <button
              onClick={() => openModal("fitness-nutrition")}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Get Started →
            </button>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Financial Planning
            </h3>
            <p className="text-gray-600 mb-6">
              Build wealth and secure your financial future with expert
              guidance.
            </p>
            <button
              onClick={() => openModal("financial-planning")}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              Learn More →
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Creative Design
            </h3>
            <p className="text-gray-600 mb-6">
              Unleash your creativity with professional design courses and
              tools.
            </p>
            <button
              onClick={() => openModal("creative-design")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Learn More →
            </button>
          </div>
        </div>
      </section>

      {/* Travel & Food Section */}
      <section id="travel-food" className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Travel & Culinary Adventures
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore the world and master culinary arts with our comprehensive
            guides for travelers and food enthusiasts alike.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-pink-50 to-rose-100 rounded-2xl p-8 border border-pink-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Travel Planning
            </h3>
            <p className="text-gray-600 mb-6">
              Plan perfect trips with destination guides and travel resources.
            </p>
            <button
              onClick={() => openModal("travel-planning")}
              className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium"
            >
              Learn More →
            </button>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-2xl p-8 border border-violet-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Cooking & Recipes
            </h3>
            <p className="text-gray-600 mb-6">
              Master culinary skills with thousands of tested recipes and
              techniques.
            </p>
            <button
              onClick={() => openModal("cooking-recipes")}
              className="bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors font-medium"
            >
              Learn More →
            </button>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 border border-indigo-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Online Learning
            </h3>
            <p className="text-gray-600 mb-6">
              Expand your knowledge with courses from world-class instructors.
            </p>
            <button
              onClick={() => openModal("online-learning")}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Learn More →
            </button>
          </div>
        </div>
      </section>

      {/* Business & Career Section */}
      <section id="business-career" className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Business & Career Growth
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Accelerate your professional journey with proven business
            strategies, career development tips, and entrepreneurship insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-2xl p-8 border border-amber-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Business Growth
            </h3>
            <p className="text-gray-600 mb-6">
              Scale your business with proven strategies and expert guidance.
            </p>
            <button
              onClick={() => openModal("business-growth")}
              className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
            >
              Learn More →
            </button>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 border border-emerald-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Mindfulness & Wellness
            </h3>
            <p className="text-gray-600 mb-6">
              Find balance and peace with comprehensive wellness programs.
            </p>
            <button
              onClick={() => openModal("mindfulness-wellness")}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              Learn More →
            </button>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-8 border border-cyan-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Content Creation
            </h3>
            <p className="text-gray-600 mb-6">
              Build your content empire with professional creation tools and
              strategies.
            </p>
            <button
              onClick={() => openModal("content-creation")}
              className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors font-medium"
            >
              Get Started →
            </button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      {/* <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Explore Our Content Categories
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setMenu(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                menu === category.id
                  ? "bg-black text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div> */}

      {/* Featured Solutions Section */}
      {/* <div className="grid md:grid-cols-2 gap-8 mb-16"> */}
      {/* Learning Platform Card */}
      {/* <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Master New Skills Online
          </h3>
          <p className="text-gray-600 mb-6">
            Access thousands of courses and learn from industry experts at your
            own pace.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
            Start Learning →
          </button>
        </div> */}

      {/* Creative Tools Card */}
      {/* <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl p-8 border border-red-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Creative Design Suite
            <span className="text-sm bg-red-500 text-white px-2 py-1 rounded-full ml-2">
              Most Popular
            </span>
          </h3>
          <p className="text-gray-600 mb-6">
            Professional design tools and resources for creators and
            entrepreneurs.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
            Get Started →
          </button>
        </div>
      </div> */}

      {/* Additional Resource Options */}
      {/* <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <h4 className="font-semibold mb-2 text-gray-800">
            Premium Productivity Suite
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            Advanced tools for maximum efficiency
          </p>
          <button className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            Learn More →
          </button>
        </div>

        <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
          <h4 className="font-semibold mb-2 text-gray-800">
            Build Your Personal Brand
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            Stand out with a strong digital presence and storytelling.
          </p>
          <button className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            Learn More →
          </button>
        </div>

        <div className="bg-teal-50 rounded-xl p-6 border border-teal-200">
          <h4 className="font-semibold mb-2 text-gray-800">
            Community & Collaboration
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            Connect and grow with like-minded professionals.
          </p>
          <button className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            Join Now →
          </button>
        </div>
      </div> */}

      {/* Dynamic Blog Items Section (if needed) */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Latest Blog Posts
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs
            .filter((blog) => menu === "All" || blog.category === menu)
            .map((item, index) => (
              <Blogitem
                key={item.id || index}
                title={item.title}
                description={item.description}
                category={item.category}
                image={item.image}
                id={item.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
