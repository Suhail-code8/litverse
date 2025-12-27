import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const BackendProductContext = createContext(null);

export default function BackendProductProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await api.get("/api/books");
        const list = res.data.books || res.data;
        setBooks(list);
        setFilteredBooks(list);
      } catch (err) {
        console.error("Failed to fetch books", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  return (
    <BackendProductContext.Provider
      value={{
        books,
        filteredBooks,
        setFilteredBooks,
        loading,
      }}
    >
      {children}
    </BackendProductContext.Provider>
  );
}
