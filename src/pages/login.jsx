import api from "../api/axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/ProductContext";
import { toast } from "sonner";
import GoogleAuthButton from "../components/GoogleAuthButton";

export default function Login() {
  // const [userData, setUserData] = useState("");
  const navigate = useNavigate();
  const {
    pass,
    setPass,
    mail,
    setMail,
    getMail,
    getPass,
    mailAlert,
    setMailAlert,
    passAlert,
    setPassAlert,
  } = useContext(AuthContext);
  const {
    currentUser,
    setCurrentUser,
    userData,
    setUserData,
    setUserCart,
    setUserWishlist,
  } = useContext(Context);
  // const API =
  //   import.meta.env.VITE_API_URL || "https://litverse-db.onrender.com";
  useEffect(() => {
    if (currentUser) {
      // Redirect based on user role if already logged in
      if (userData?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, []);

  async function verifyUser() {
    try {
      const res = await api.post("/api/auth/login", {
        email: mail,
        password: pass,
      });

      const { accessToken, user } = res.data;
      localStorage.setItem("accessToken", accessToken);
      setCurrentUser(user.id);
      setUserData(user);

      // fetch cart & wishlist
      try {
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
        const mappedWishlist = (wishRes.data.wishlist || []).map(
          (it) => it.book
        );
        setUserCart(mappedCart);
        setUserWishlist(mappedWishlist);
      } catch (err) {
        console.log("Failed to fetch cart/wishlist", err);
      }

      toast.success("Login Successful", { duration: 1000 });

      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed";
      // setMailAlert(msg.includes("email") ? msg : "");
      // setPassAlert(msg.includes("password") ? msg : "");
      toast.error(msg);
    } finally {
      setMail("");
      setPass("");
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Enter Your Data
          </h1>
          <p className="text-gray-600">Login to your Excisting Account</p>
        </div>

        {/* Form Div*/}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                value={mail}
                type="email"
                onChange={getMail}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-sm text-red-600 min-h-[20px]">{mailAlert}</p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={pass}
                onChange={getPass}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              {/* Forgot password */}
              <div className="flex justify-end mt-1">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>

              <p className="text-sm text-red-600 min-h-[20px]">{passAlert}</p>
            </div>

            {/* Login Button */}
            <button
              onClick={verifyUser}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-sm text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Google Login */}
            <GoogleAuthButton />

            {/* Signup */}
            <p className="text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
