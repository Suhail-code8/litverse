import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";
import { toast } from "sonner";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchWishlist() {
    if (!user || user.role === "admin") return;

    try {
      setLoading(true);
      const res = await api.get("/api/wishlist");
      setWishlist(res.data.wishlist || []);
    } catch (err) {
      console.error("Wishlist fetch failed", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  async function toggleWishlist(bookId) {
    try {
      const exists = wishlist.some(w => w.book._id === bookId);

      if (exists) {
        await api.delete(`/api/wishlist/${bookId}`);
        setWishlist(prev => prev.filter(w => w.book._id !== bookId));
        toast.success("Removed from wishlist");
      } else {
        await api.post("/api/wishlist", { bookId });
        toast.success("Added to wishlist");
        fetchWishlist();
      }
    } catch (err) {
      toast.error("Wishlist update failed");
    }
  }

  return (
    <WishlistContext.Provider
      value={{ wishlist, loading, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
