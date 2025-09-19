import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  X,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-purple-800 text-gray-300 py-8 mt-12">
      <div className="container  mx-auto px-4 flex  gap-8 justify-around text-center md:text-left">
        {/* Brand / Logo */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h2 className="text-3xl font-bold text-white tracking-wide">
            LitVerse
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed max-w-xs text-center md:text-left">
            Your gateway to magical stories and timeless knowledge 📚
          </p>
          <div className="text-xs text-gray-300 text-center md:text-left">
            <p>Discover • Read • Inspire</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-red-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-red-400">
                Products
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-red-400">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div>
            <a
              href="#"
              className="hover:text-red-400 transition-colors flex items-center space-x-2 max-w-max"
            >
              <Instagram size={20} />
              <span>Instagram</span>
            </a>
          </div>
          <div>
            {" "}
            <a
              href="#"
              className="hover:text-red-400 transition-colors flex items-center space-x-2 max-w-max"
            >
              <Facebook size={20} />
              <span>Facebook</span>
            </a>
          </div>
          <div>
            <a
              href="#"
              className="hover:text-red-400 transition-colors flex items-center space-x-2 max-w-max"
            >
              <X size={20} />
              <span>X</span>
            </a>
          </div>
          <div>
            <a
              href="#"
              className="hover:text-red-400 transition-colors flex items-center space-x-2 max-w-max"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="mt-8 border-t border-gray-500 pt-4 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} LitVerse. All rights reserved.
      </div>
    </footer>
  );
}
