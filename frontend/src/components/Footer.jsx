import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center lg:text-left">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold mb-3">
            Job<span className="text-purple-500">Portal</span>
          </h2>
          <p className="text-sm sm:text-base leading-relaxed max-w-xs mx-auto lg:mx-0">
           Find Latest jobs as freshers
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-purple-500 transition">Home</a></li>
            <li><a href="#" className="hover:text-purple-500 transition">Jobs</a></li>
            <li><a href="#" className="hover:text-purple-500 transition">About</a></li>
            <li><a href="#" className="hover:text-purple-500 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>📍 123 Job Street, Mumbai</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ support@jobportal.com</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center lg:justify-start space-x-4">
            <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-purple-500 hover:text-white transition duration-300">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-purple-500 hover:text-white transition duration-300">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-purple-500 hover:text-white transition duration-300">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-purple-500 hover:text-white transition duration-300">
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 pt-6 text-center text-xs sm:text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="font-semibold text-gray-700">Vishal Meshram</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
