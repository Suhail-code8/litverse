import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-gray-300 py-10 mt-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Brand / Logo */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">LitVerse</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your gateway to magical stories and timeless knowledge 📚
          </p>
          <p className="text-xs text-gray-500">Discover • Read • Inspire</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-pink-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-pink-400 transition-colors">
                Products
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-pink-400 transition-colors">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-5">
            <a href="#" className="hover:text-pink-400 transition-colors">
              <Instagram size={22} />
            </a>
            <a href="#" className="hover:text-pink-400 transition-colors">
              <Facebook size={22} />
            </a>
            <a href="#" className="hover:text-pink-400 transition-colors">
              <Twitter size={22} />
            </a>
            <a href="#" className="hover:text-pink-400 transition-colors">
              <Linkedin size={22} />
            </a>
            <a href="#" className="hover:text-pink-400 transition-colors">
              <Youtube size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} LitVerse. All rights reserved.
      </div>
    </footer>
  );
}
