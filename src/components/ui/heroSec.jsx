import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HeroCarousel({ books = [] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!books.length) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % books.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [books.length]);

  if (!books.length) {
    return (
      <div className="h-[28rem] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  const currentBook = books[current];

  return (
    <div className="relative h-[28rem] w-full overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center">
      
      {/* Text Section */}
      <div className="flex flex-col items-start max-w-md w-1/2 px-6">
        <h2 className="text-3xl font-bold">
          {currentBook.title}
        </h2>

        <h3 className="text-lg mt-2 italic">
          by {currentBook.author}
        </h3>

        <p className="mt-4 text-sm text-gray-300">
          {currentBook.description}
        </p>
      </div>

      {/* Image Section */}
      <div className="flex justify-center items-center w-2/4">
        <Link to={`/productView/${currentBook._id}`}>
          <img
            src={currentBook.image?.url}
            alt={currentBook.title}
            className="max-h-[350px] object-contain rounded-lg shadow-lg"
          />
        </Link>
      </div>

    </div>
  );
}
