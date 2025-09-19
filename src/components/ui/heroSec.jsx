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
    <div className="relative h-[28rem] w-full overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center">
      <div className="flex flex-col items-start max-w-md w-1/2 px-6">
        <h2 className="text-3xl font-bold">{currentBook.title}</h2>
        <h3 className="text-lg mt-2 italic">by {currentBook.author}</h3>
        <p className="mt-4 text-sm text-gray-300">{currentBook.description}</p>
      </div>
      <div className="flex justify-center items-center w-2/4">
      <Link to={`/productView/${currentBook.id}`}>
        <img
          src={currentBook.image}
          alt={currentBook.title}
          className="max-h-[350px] object-contain rounded-lg shadow-lg"
        />
        </Link>
      </div>
    </div>
  );
}
