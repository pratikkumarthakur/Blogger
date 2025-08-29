import React, { useState } from "react";
import { assets } from "@/Assests/assets";
import Image from "next/image";
import {
  X,
  Heart,
  Users,
  Sparkles,
  Dumbbell,
  Scale,
  Scissors,
  Pill,
  Phone,
} from "lucide-react";

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);

  const healthTopics = {
    "sexual-health": {
      title: "Sexual Health",
      icon: <Heart className="w-6 h-6 text-red-500" />,
      description:
        "Comprehensive sexual health resources and treatments designed to enhance your intimate well-being. Our expert-backed solutions address common concerns with discretion and professionalism.",
      features: [
        "Expert consultations",
        "FDA-approved treatments",
        "Discreet shipping",
        "24/7 support",
      ],
    },
    "mens-performance": {
      title: "Men's Performance",
      icon: <Dumbbell className="w-6 h-6 text-blue-500" />,
      description:
        "Specialized solutions for men's health and performance enhancement. From vitality to confidence, we provide personalized treatments to help you perform at your best.",
      features: [
        "Performance enhancement",
        "Energy boosters",
        "Confidence building",
        "Licensed providers",
      ],
    },
    "womens-vitality": {
      title: "Women's Vitality",
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
      description:
        "Empowering women with health solutions that enhance vitality and well-being. Our treatments are designed specifically for women's unique health needs and life stages.",
      features: [
        "Hormonal balance",
        "Energy enhancement",
        "Wellness programs",
        "Expert guidance",
      ],
    },
    "art-of-intimacy": {
      title: "Art of Intimacy",
      icon: <Users className="w-6 h-6 text-purple-500" />,
      description:
        "Discover the deeper aspects of intimate relationships and connection. Our resources help couples and individuals enhance their intimate experiences and emotional bonds.",
      features: [
        "Relationship guidance",
        "Communication tools",
        "Intimacy enhancement",
        "Professional advice",
      ],
    },
    "wellness-tips": {
      title: "Wellness Tips",
      icon: <Heart className="w-6 h-6 text-green-500" />,
      description:
        "Daily wellness advice and tips from healthcare professionals. Stay informed with the latest in health trends, nutrition, and lifestyle improvements.",
      features: [
        "Daily tips",
        "Expert articles",
        "Lifestyle guidance",
        "Health trends",
      ],
    },
  };

  const services = {
    "weight-management": {
      title: "Weight Management",
      icon: <Scale className="w-6 h-6 text-orange-500" />,
      description:
        "Comprehensive weight management solutions tailored to your lifestyle. Our medically-supervised programs combine nutrition, exercise, and proven treatments for sustainable results.",
      features: [
        "Personalized plans",
        "Medical supervision",
        "Nutrition guidance",
        "Progress tracking",
      ],
    },
    "performance-enhancement": {
      title: "Performance Enhancement",
      icon: <Dumbbell className="w-6 h-6 text-red-500" />,
      description:
        "Boost your physical and mental performance with our scientifically-backed enhancement programs. From athletic performance to cognitive function, we help you excel.",
      features: [
        "Athletic optimization",
        "Cognitive enhancement",
        "Energy boosting",
        "Recovery support",
      ],
    },
    "hair-restoration": {
      title: "Hair Restoration",
      icon: <Scissors className="w-6 h-6 text-amber-500" />,
      description:
        "Advanced hair restoration treatments that deliver real results. Our comprehensive approach includes both medical treatments and lifestyle recommendations for optimal hair health.",
      features: [
        "Medical treatments",
        "Non-surgical options",
        "Personalized care",
        "Proven results",
      ],
    },
    "daily-wellness": {
      title: "Daily Wellness",
      icon: <Heart className="w-6 h-6 text-teal-500" />,
      description:
        "Transform your daily routine with our wellness programs. From morning energy to evening recovery, we provide solutions that fit seamlessly into your lifestyle.",
      features: [
        "Daily routines",
        "Supplement guidance",
        "Lifestyle optimization",
        "Habit building",
      ],
    },
    consultation: {
      title: "Online Consultation",
      icon: <Phone className="w-6 h-6 text-indigo-500" />,
      description:
        "Connect with licensed healthcare providers from the comfort of your home. Our secure platform ensures confidential consultations and personalized treatment plans.",
      features: [
        "Licensed providers",
        "Secure platform",
        "Flexible scheduling",
        "Follow-up care",
      ],
    },
  };

  const supportPages = {
    about: {
      title: "About Us",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      description:
        "Wellness Hub is a leading healthcare platform dedicated to providing comprehensive, discreet, and personalized health solutions. Founded by healthcare professionals, we combine cutting-edge medical treatments with compassionate care.",
      features: [
        "Licensed healthcare providers",
        "FDA-approved treatments",
        "Over 5 years of experience",
        "Thousands of satisfied patients",
      ],
    },
    contact: {
      title: "Contact Us",
      icon: <Phone className="w-6 h-6 text-green-500" />,
      description:
        "Get in touch with our healthcare team for personalized support and guidance. We're here to help you on your wellness journey with professional, confidential, and caring service.",
      features: [
        "24/7 customer support",
        "Live chat available",
        "Email: support@wellnesshub.com",
        "Phone: 1-800-WELLNESS",
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      icon: <Heart className="w-6 h-6 text-yellow-500" />,
      description:
        "Find answers to the most common questions about our services, treatments, shipping, and more. Our comprehensive FAQ section covers everything you need to know about your wellness journey.",
      features: [
        "Treatment information",
        "Shipping & delivery",
        "Privacy & security",
        "Billing & insurance",
      ],
    },
    privacy: {
      title: "Privacy Policy",
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      description:
        "Your privacy is our top priority. We maintain the highest standards of data protection and confidentiality, ensuring your personal health information is secure and protected at all times.",
      features: [
        "HIPAA compliant",
        "256-bit SSL encryption",
        "Secure data storage",
        "No data sharing with third parties",
      ],
    },
    terms: {
      title: "Terms of Service",
      icon: <Dumbbell className="w-6 h-6 text-indigo-500" />,
      description:
        "Our terms of service outline the guidelines and policies for using our platform. We ensure transparent, fair, and ethical practices in all our healthcare services and patient interactions.",
      features: [
        "Clear service guidelines",
        "Patient rights protection",
        "Refund policies",
        "Service guarantees",
      ],
    },
  };

  const openModal = (modalKey) => {
    setActiveModal(modalKey);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const Modal = ({ isOpen, onClose, data }) => {
    if (!isOpen || !data) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-white/20 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        {/* Modal Content */}
        <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-white/30">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
            <div className="flex items-center gap-3">
              {data.icon}
              <h3 className="text-xl font-bold text-gray-800">{data.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100/50 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              {data.description}
            </p>

            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800 mb-3">
                Key Features:
              </h4>
              {data.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-full mt-6 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <footer className="bg-black text-white">
        {/* Main Footer Content */}
        <div className="px-5 md:px-12 lg:px-28 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}

            <div>
              <Image
                src={assets.logo}
                width={120}
                alt="Wellness Hub"
                className="w-[100px] sm:w-[120px] cursor-pointer"
              />

              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Your trusted partner in health, wellness, and intimate care.
                Professional, discreet, and personalized solutions for better
                living.
              </p>
              <div className="flex gap-3"></div>
            </div>

            {/* Health Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Health Topics</h3>
              <ul className="space-y-2 text-sm">
                {Object.entries(healthTopics).map(([key, topic]) => (
                  <li key={key}>
                    <button
                      onClick={() => openModal(key)}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      {topic.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Our Services</h3>
              <ul className="space-y-2 text-sm">
                {Object.entries(services).map(([key, service]) => (
                  <li key={key}>
                    <button
                      onClick={() => openModal(key)}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      {service.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                {Object.entries(supportPages).map(([key, page]) => (
                  <li key={key}>
                    <button
                      onClick={() => openModal(key)}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      {page.title}
                    </button>
                  </li>
                ))}
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
              <a
                href="/medical-disclaimer"
                className="hover:text-white transition-colors"
              >
                Medical Disclaimer
              </a>
              <a
                href="/shipping-info"
                className="hover:text-white transition-colors"
              >
                Shipping Info
              </a>
              <a href="/returns" className="hover:text-white transition-colors">
                Returns
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal
        isOpen={activeModal !== null}
        onClose={closeModal}
        data={
          healthTopics[activeModal] ||
          services[activeModal] ||
          supportPages[activeModal]
        }
      />
    </>
  );
};

export default Footer;
