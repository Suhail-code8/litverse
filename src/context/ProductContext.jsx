import axios from "axios";
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
  const API = import.meta.env.VITE_API_URL || "https://litverse-db.onrender.com";



  //fetching datas and setting on the initial rendering

  useEffect(() => {
    async function fetchdata() {
      try {
        let res = await axios.get(`${API}/books`);
        let list = res.data;
        setProductList(list);
        setfilteredList(list);

        let userId = localStorage.getItem("id");
        setCurrentUser(userId);

        if (userId) {
          try {
            let user = await axios.get(`${API}/users/${userId}`);
            user = user.data;
            setUserData(user);
            setUserWishlist(user.wishlist);
            setUserCart(user.cart);
            setUserOrders(user.orders);
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

    try {
      let res = await axios.get(`${API}/users/${currentUser}`);
      let user = res.data;

      user.cart.map((val) => {

        //operation if product is allready in the cart
        if (val.id === product.id) {
          try {
            if (type === "incr") {
              product.stock === product.cartCount 
                ? toast.error(`Only ${product.stock} stock is left`)
                : (val.cartCount += 1, toast.success(`Added one more quantity`, { duration: 1000 }));
            } else if (type === "checkincr" || !type) {
              toast.info(`${product.title} is already in the cart`, { duration: 1000 });
            } else if (type === "decr" && val.cartCount > 1) {
              val.cartCount -= 1;
              toast.error(`Removed one quantity`, { duration: 1000 });
            } else if (type === "remove") {
              user.cart = user.cart.filter((val) => val.id !== product.id);
              toast.error(`${product?.title} Removed from Cart`, { duration: 1000 });
            }
            setUserCart(user.cart);
            axios.patch(`${API}/users/${currentUser}`, { cart: user.cart });
            onCart = true;
          } catch (err) {
            console.log("Error : ", err);
          }
        }
      });

      //product is not in the cart
      if (!onCart) {
        try {
          if (product.stock === 0) toast.error("Product is out of stock", { duration: 1000 });
          else {
            product.cartCount = 1;
            delete product.reviews;
            const newCart = [...user.cart, product];
            await axios.patch(`${API}/users/${currentUser}`, { cart: newCart });
            toast.success(`${product?.title} added to Cart`, { duration: 1000 });
            setUserCart(newCart);
          }
        } catch (err) {
          console.log("Error : ", err);
        }
      }
      onCart = false;
    } catch (err) {
      console.log("Error : ", err);
    }
  }
// adding and removing from wishlist functionality.
  async function addToWishlist(product) {
    delete product.reviews;
    if (!currentUser) return navigate("/login");

    try {
      let res = await axios.get(`${API}/users/${currentUser}`);
      let wishlist = res.data.wishlist;
      let onwishList = wishlist.some((val) => product.id === val.id);

      if (!onwishList) {
        try {
          const newWishlist = [...wishlist, product];
          await axios.patch(`${API}/users/${currentUser}`, { wishlist: newWishlist });
          toast.success(`${product?.title} added to Wishlist`, { duration: 1000 });
          setUserWishlist(newWishlist);
        } catch (err) {
          console.log("Error : ", err);
        }
      } else {
        try {
          const newWishlist = wishlist.filter((val) => val.id !== product.id);
          await axios.patch(`${API}/users/${currentUser}`, { wishlist: newWishlist });
          toast.error(`${product.title} removed from wishlist`, { duration: 1000 });
          setUserWishlist(newWishlist);
        } catch (err) {
          console.log("Error : ", err);
        }
      }
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
