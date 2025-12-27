import api from "../api/axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Spinner from "../components/ui/LoaadingSpinner";

export const Context = createContext("");

export default function ProdProvider({ children }) {
  const [filteredList, setfilteredList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState({});
  const [userWishlist, setUserWishlist] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [orderedBooks, setOrderedBooks] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [isSingle, setIsSingle] = useState(false);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  let onCart = false;
  let navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || "http://localhost:4000";



  //fetching datas and setting on the initial rendering

  useEffect(() => {
    async function fetchdata() {
      try {
        // load minimal user-related data if auth present
        const token = localStorage.getItem("accessToken");
        if (token) {
          try {
            const res = await api.get("/api/auth/user");
            const user = res.data.user;
            setCurrentUser(user.id);
            setUserData(user);
            // fetch cart and wishlist from backend
            const [cartRes, wishRes] = await Promise.all([
              api.get("/api/cart"),
              api.get("/api/wishlist"),
            ]);

            const mappedCart = (cartRes.data.items || []).map((it) => ({
              id: it.book._id,
              title: it.book.title,
              price: it.book.price,
              image: it.book.image,
              rating: it.book.rating,
              cartCount: it.qty,
            }));

            const mappedWishlist = (wishRes.data.wishlist || []).map((it) => it.book);

            setUserCart(mappedCart);
            setUserWishlist(mappedWishlist);
            setUserOrders(user.orders || []);
          } catch (err) {
            console.log("Error : ", err);
          }
        }
      } catch (err) {
        console.log("Error : ", err);
      } finally {
        setLoading(false);
      }
    }
    fetchdata();
  }, []);

  //Multipurpose add to cart
  //triggered when user click add to cart button ,count-increment,decrement and remove button from cart
  async function addToCart(product, index, array, type) {
    if (!currentUser) return navigate("/login");

    // use product._id or product.id as fallback
    const bookId = product._id || product.id;
    if (!bookId) {
      toast.error("Product ID not found");
      return;
    }

    try {
      if (type === "checkincr") {
        // adding product (if already exists backend will return error)
        await api.post("/api/cart", { bookId });
        toast.success(`${product?.title} added to Cart`, { duration: 1000 });
      } else if (type === "incr") {
        const newQty = Number(product.cartCount) + 1;
        await api.put("/api/cart", { bookId, qty: newQty });
        toast.success("Added one more quantity", { duration: 1000 });
      } else if (type === "decr") {
        const newQty = Number(product.cartCount) - 1;
        await api.put("/api/cart", { bookId, qty: newQty });
        toast.success("Removed one quantity", { duration: 1000 });
      } else if (type === "remove") {
        await api.delete("/api/cart", { data: { bookId } });
        toast.error(`${product?.title} Removed from Cart`, { duration: 1000 });
      } else {
        // default add
        await api.post("/api/cart", { bookId });
        toast.success(`${product?.title} added to Cart`, { duration: 1000 });
      }

      // refresh cart
      const cartRes = await api.get("/api/cart");
      const mappedCart = (cartRes.data.items || []).map((it) => ({
        id: it.book._id,
        title: it.book.title,
        price: it.book.price,
        image: it.book.image,
        rating: it.book.rating,
        cartCount: it.qty,
      }));
      setUserCart(mappedCart);
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || "Error";
      toast.error(message);
      console.log("Error : ", err);
    }
  }
// adding and removing from wishlist functionality.
  async function addToWishlist(product) {
    if (!currentUser) return navigate("/login");

    // use product._id or product.id as fallback
    const bookId = product._id || product.id;
    if (!bookId) {
      toast.error("Product ID not found");
      return;
    }

    try {
      // check presence
      const existing = userWishlist.some((val) => val._id === bookId || val.book?._id === bookId);
      if (!existing) {
        await api.post("/api/wishlist", { bookId });
        toast.success(`${product?.title} added to Wishlist`, { duration: 1000 });
      } else {
        await api.delete(`/api/wishlist/${bookId}`);
        toast.error(`${product.title} removed from wishlist`, { duration: 1000 });
      }

      const wishRes = await api.get("/api/wishlist");
      const mappedWishlist = (wishRes.data.wishlist || []).map((it) => it.book);
      setUserWishlist(mappedWishlist);
    } catch (err) {
      console.log("Error : ", err);
    }
  }

  // Direct bying functionality
  async function byNow(product) {
    if (!currentUser) return navigate("/login");

    try {
      if (product.stock === 0) {
        toast.error("Product is out of stock");
        return;
      }
      setIsSingle(true);
      delete product.reviews;
      setProduct(product);
      navigate("/checkout", {
        state: {
          subTotal: product.price,
          shipping: "free",
          discount: (product.price % Math.floor(product.price)).toFixed(2),
          total: (product.price - (product.price % Math.floor(product.price)).toFixed(2)).toFixed(2),
        },
      });
    } catch (err) {
      console.log("Error : ", err);
    }
  }
  return (
    <Context.Provider
      value={{
        productList,
        setProductList,
        currentUser,
        setCurrentUser,
        addToCart,
        addToWishlist,
        userData,
        setUserData,
        userWishlist,
        userCart,
        byNow,
        filteredList,
        setfilteredList,
        setUserCart,
        setUserWishlist,
        userOrders,
        setUserOrders,
        orderedBooks,
        setOrderedBooks,
        isSingle,
        setIsSingle,
        product,
        loading,
      }}
    >
      {children}
    </Context.Provider>
  );
}
