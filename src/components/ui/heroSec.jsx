import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star, ArrowRight } from "lucide-react";

export default function HeroCarousel({ books = [] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!books.length) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % books.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [books.length, current]);

  if (!books.length) {
    return (
      <div className="h-[600px] bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const currentBook = books[current];

  return (
    <div className="relative h-[600px] overflow-hidden bg-gray-900 group">
      {/* Background Image with Blur */}
      {books.map((book, index) => (
        <div
          key={book._id || index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
            }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transform scale-105"
            style={{ backgroundImage: `url(${book.image?.url})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
          {/* Text Content */}
          <div className="space-y-6 lg:max-w-xl">
            <div className="flex items-center gap-3 animate-fade-in-up">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-400/10 rounded-full border border-blue-400/20">
                Featured Title
              </span>
              {currentBook.rating && (
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-semibold">{currentBook.rating}</span>
                </div>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight animate-fade-in-up delay-100">
              {currentBook.title}
            </h1>

            <div className="animate-fade-in-up delay-200">
              <p className="text-xl text-gray-300 font-medium">
                by <span className="text-white">{currentBook.author}</span>
              </p>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed line-clamp-3 max-w-lg animate-fade-in-up delay-300">
              {currentBook.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-up delay-400">
              <Link
                to={`/productView/${currentBook._id}`}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-blue-600/30"
              >
                Read More
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/products"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all backdrop-blur-sm border border-white/10"
              >
                View Collection
              </Link>
            </div>
          </div>

          {/* Book Cover Image - Only visible on large screens */}
          <div className="hidden lg:flex items-center justify-center animate-fade-in-up delay-500">
            <Link
              to={`/productView/${currentBook._id}`}
              className="relative group/book transform hover:scale-105 transition-all duration-500"
            >
              <div className="relative w-64 h-96 rounded-r-xl shadow-2xl skew-y-0 group-hover/book:-skew-y-3 transition-transform duration-500">
                <img
                  src={currentBook.image?.url}
                  alt={currentBook.title}
                  className="w-full h-full object-cover rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                />
                {/* Book Spine Effect */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-transparent to-black/20 rounded-l-md" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 right-8 flex gap-4 z-20">
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + books.length) % books.length)}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % books.length)}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
        <div
          key={current}
          className="h-full bg-blue-500 animate-[progress_6s_linear_infinite]"
        />
      </div>
    </div>
  );
}
