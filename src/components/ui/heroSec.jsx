import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star, ArrowRight } from "lucide-react";

export default function HeroCarousel({ books = [] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!books.length) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % books.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [books.length, current]);

  if (!books.length) {
    return (
      <div className="h-[500px] bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  const currentBook = books[current];

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content Section */}
          <div className="text-white space-y-6 z-10">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-blue-400"></div>
              <span className="text-blue-300 font-medium uppercase text-sm tracking-wider">
                Featured Collection
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              {currentBook.title}
            </h1>

            <div className="flex items-center gap-4">
              <p className="text-xl text-gray-300">
                by <span className="text-white font-semibold">{currentBook.author}</span>
              </p>
              {currentBook.rating && (
                <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{currentBook.rating}</span>
                </div>
              )}
            </div>

            <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
              {currentBook.description?.slice(0, 180)}...
            </p>

            <div className="flex gap-4 pt-4">
              <Link
                to={`/productView/${currentBook._id}`}
                className="group bg-white text-gray-900 px-7 py-3.5 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center gap-2"
              >
                Explore Book
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/products"
                className="border-2 border-white/30 text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-white/10 backdrop-blur-sm transition-all"
              >
                View Collection
              </Link>
            </div>
          </div>

          {/* Book Image Section */}
          <div className="relative z-10">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-75"></div>
              
              {/* Book Container */}
              <Link to={`/productView/${currentBook._id}`} className="relative block group">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 transform group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={currentBook.image?.url}
                    alt={currentBook.title}
                    className="w-full h-[450px] object-contain drop-shadow-2xl"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        {books.length > 1 && (
          <div className="flex items-center justify-between mt-12">
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + books.length) % books.length)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-lg transition-all border border-white/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {books.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === current ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrent((prev) => (prev + 1) % books.length)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-lg transition-all border border-white/20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}