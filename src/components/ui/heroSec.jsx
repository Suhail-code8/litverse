import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const books = [
  {
    id: 3,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    image: "https://m.media-amazon.com/images/I/81YOuOGFCJL.jpg",
    description:
      "The first book in the beloved Harry Potter series, introducing readers to the magical world of Hogwarts and the boy who lived",
  },
  {
    id: 76,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    image: "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg",
    description:
      "A groundbreaking personal finance book that contrasts two approaches to money, teaching financial independence and wealth-building habits",
  },
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    image:
      "https://m.media-amazon.com/images/I/81ZtAPCqyGL._UF1000,1000_QL80_.jpg",
    description:
      "A novel about a young shepherd's journey to find treasure in the Egyptian desert",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % books.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const currentBook = books[current];

  return (
    <div className="relative h-[28rem] w-full overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
      
      {/* ✅ Mobile: Only Image */}
      <div className="block md:hidden h-full w-full">
        <Link to={`/productView/${currentBook.id}`}>
          <img
            src={currentBook.image}
            alt={currentBook.title}
            className="h-full w-full object-cover"
          />
        </Link>
      </div>

      {/* ✅ Desktop: Text + Image */}
      <div className="hidden md:flex h-full items-center justify-between px-10">
        {/* Text */}
        <div className="flex flex-col justify-center max-w-lg space-y-4">
          <h2 className="text-4xl font-extrabold leading-snug drop-shadow-md">
            {currentBook.title}
          </h2>
          <h3 className="text-lg italic opacity-90">
            by {currentBook.author}
          </h3>
          <p className="text-base text-gray-200 leading-relaxed">
            {currentBook.description}
          </p>
          <Link
            to={`/productView/${currentBook.id}`}
            className="inline-block mt-3 px-6 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
          >
            View Details
          </Link>
        </div>

        {/* Image */}
        <div className="flex justify-center items-center">
          <Link to={`/productView/${currentBook.id}`}>
            <img
              src={currentBook.image}
              alt={currentBook.title}
              className="max-h-[380px] rounded-xl shadow-2xl"
            />
          </Link>
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {books.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white" : "bg-gray-400/60"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
