import React, { useState } from "react";
import {
  X,
  Shield,
  Users,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">GH</span>
                </div>
                <span className="text-xl font-bold">GoodHealth</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your trusted companion for holistic wellness and everyday
                health. Supporting you with reliable tools and insights to
                thrive.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-xs">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-xs">t</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-xs">in</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Wellness Topics</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => openModal("fitness")}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Fitness and Exercise
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("mindfulness")}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Mental Well-being
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("nutrition")}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Nutrition & Diet
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("lifestyle")}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Healthy Lifestyle
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => openModal("about")}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("careers")}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("contact")}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("guidelines")}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Community Guidelines
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Get in Touch</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400 text-sm">
                  <Phone size={16} />
                  <span>+91-9876543210</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 text-sm">
                  <Mail size={16} />
                  <span>support@goodhealth.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 text-sm">
                  <Clock size={16} />
                  <span>Mon - Sat: 9 AM - 6 PM</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 text-sm">
                  <MapPin size={16} />
                  <span>India • Global Services</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2025 GoodHealth. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <button
                  onClick={() => openModal("terms")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => openModal("privacy")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Example Modal Usage */}
      <Modal
        isOpen={activeModal === "nutrition"}
        onClose={closeModal}
        title="Nutrition & Diet"
      >
        <p className="text-gray-700">
          Discover healthy and sustainable eating habits, recipes, and tips to
          boost your energy and immunity naturally.
        </p>
      </Modal>

      <Modal
        isOpen={activeModal === "mindfulness"}
        onClose={closeModal}
        title="Mental Well-being"
      >
        <p className="text-gray-700">
          Explore simple practices to enhance your focus, manage stress, and
          maintain emotional balance in daily life.
        </p>
      </Modal>

      {/* Add more modals similarly for terms, privacy, etc. */}
    </>
  );
};

export default Footer;
