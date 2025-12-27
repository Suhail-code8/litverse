import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";
import { toast } from "sonner";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);


  // FETCH CART

  async function fetchCart() {
    if (!user || user.role === "admin") return;

    try {
      setLoading(true);
      const res = await api.get("/api/cart");
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Fetch cart failed", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, [user]);


  // ADD TO CART

  async function addToCart(bookId) {
    try {
      await api.post("/api/cart", { bookId });
      toast.success("Added to cart");
      fetchCart();
    } catch (err) {
      toast.error(err.response?.data?.message || "Add failed");
    }
  }


  // UPDATE QTY

  async function updateQty(bookId, qty) {
    try {
      await api.put("/api/cart", { bookId, qty });
      fetchCart();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  }


  // REMOVE

  async function removeFromCart(bookId) {
    try {
      await api.delete("/api/cart", { data: { bookId } });
      fetchCart();
    } catch (err) {
      toast.error("Remove failed");
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQty,
        removeFromCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
