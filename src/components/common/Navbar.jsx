import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import { Context } from "../../context/ProductContext";
import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  LogIn,
  LogOut,
  Menu,
  X,
  Search,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { BackendProductContext } from "../../context/BackendProductContext";
import api from "../../api/axios";

function Navbar() {
  let {
    currentUser,
    setCurrentUser,
    userWishlist,
    userCart,
    setUserCart,
    setUserWishlist,
    setUserData,
  } = useContext(Context);

  const { books: productList } = useContext(BackendProductContext);


  const [text, setText] = useState("");
  const [logText, setLogText] = useState("Login");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [ismenuOn, setIsmenuOn] = useState(false);

  function search(e) {
    setText(e.target.value);
  }

 async function logout() {
    await api.post('/api/auth/logout')
    localStorage.clear();
    setCurrentUser(null);
    setUserCart([]);
    setUserWishlist([]);
    toast.error("Signed out from your account", { duration: 1000 });
    setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    currentUser ? setLogText("Logout") : setLogText("Login");
  }, [currentUser]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [window.location.pathname]);

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100">
      <div className="z-40 relative ">
        <nav className="max-w-screen mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16 py-3">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 mr-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Logo */}
              <Link to="/" className="flex items-center group">
                <div className="w-10 h-10 md:w-12 md:h-12 transition-transform duration-200 group-hover:scale-105">
                  <Logo />
                </div>
                <span className="ml-2 md:ml-3 text-xl font-bold text-gray-800">
                  LitVerse
                </span>
              </Link>
            </div>

            {/* Search bar - hidden on mobile when menu is open */}
            <div
              className={`flex-1 max-w-2xl mx-4 relative ${
                isMobileMenuOpen ? "hidden" : "hidden md:block"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  onChange={search}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() =>
                    setTimeout(() => setIsSearchFocused(false), 300)
                  }
                  value={text}
                  className="w-full pl-10 pr-4 py-2 md:py-3 text-gray-800 bg-gray-50 border border-gray-200 
                  rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent text-sm placeholder-gray-500 transition-all duration-200
                  shadow-sm hover:shadow-md focus:shadow-lg"
                  placeholder="Search for books"
                  type="text"
                />
              </div>

              {/* Search results dropdown */}
              {text.trim() && isSearchFocused && (
                <div
                  className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 
                rounded-2xl shadow-2xl max-h-80 overflow-y-auto z-50"
                >
                  <div className="p-2">
                    {productList?.map((product) => {
                      if (
                        product.title.toLowerCase().includes(text.toLowerCase())
                      ) {
                        return (
                          <Link
                            to={`/productView/${product._id}`}
                            key={product._id}
                            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 
                            hover:text-blue-600 transition-all duration-150 text-sm rounded-xl m-1
                            hover:shadow-sm font-medium"
                          >
                            {product.title}
                          </Link>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Navigation Links */}
            <div className="flex justify-between">
              <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-all duration-200
                hover:scale-105"
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-all duration-200
                hover:scale-105"
                >
                  Products
                </Link>

                {/* Wishlist icon*/}
                <Link
                  to={currentUser ? "/wishlist" : "/login"}
                  className="relative text-gray-600 hover:text-red-500 transition-all duration-200
                hover:scale-110 p-2 rounded-full hover:bg-red-50"
                  title="Wishlist"
                >
                  <Heart size={22} />
                  {userWishlist?.length > 0 && (
                    <span
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 
                  text-white text-xs w-5 h-5 flex items-center justify-center rounded-full 
                  shadow-lg font-medium"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {userWishlist.length}
                    </span>
                  )}
                </Link>

                {/* Cart icon*/}
                <Link
                  to={currentUser ? "/cart" : "/login"}
                  className="relative text-gray-600 hover:text-blue-600 transition-all duration-200
                hover:scale-110 p-2 rounded-full hover:bg-blue-50"
                  title="Shopping Cart"
                >
                  <ShoppingCart size={22} />
                  {userCart?.length > 0 && (
                    <span
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-indigo-500 
                  text-white text-xs w-5 h-5 flex items-center justify-center rounded-full 
                  shadow-lg font-medium"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {userCart
                        .flatMap((x) => x.cartCount)
                        .reduce((a, b) => a + b, 0)}
                    </span>
                  )}
                </Link>
            

            {/* Mobile icons (only show cart and profile on mobile) */}
            <div className="flex md:hidden items-center space-x-4">
              {/* Mobile search button */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.querySelector(".mobile-search-input")?.focus();
                }}
                className="p-2 text-gray-600 hover:text-blue-600"
              >
                <Search size={22} />
              </button>

              {/* Cart icon*/}
              <Link
                to={currentUser ? "/cart" : "/login"}
                className="relative text-gray-600 hover:text-blue-600"
                title="Shopping Cart"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart size={22} />
                {userCart?.length > 0 && (
                  <span
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-indigo-500 
                  text-white text-xs w-4 h-4 flex items-center justify-center rounded-full 
                  font-medium"
                    style={{ fontSize: "0.6rem" }}
                  >
                    {userCart
                      .flatMap((x) => x.cartCount)
                      .reduce((a, b) => a + b, 0)}
                  </span>
                )}
              </Link>
            </div>
              </div>

              <button 
                className="font-lg hidden md:block"
                onClick={() => setIsmenuOn(!ismenuOn)}
              >
                <Menu size={24} />{" "}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar - appears when menu is closed */}
          {!isMobileMenuOpen && (
            <div className="md:hidden pb-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  onChange={search}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() =>
                    setTimeout(() => setIsSearchFocused(false), 200)
                  }
                  value={text}
                  className="mobile-search-input w-full pl-10 pr-4 py-2 text-gray-800 bg-gray-50 border border-gray-200 
                  rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent text-sm placeholder-gray-500 transition-all duration-200
                  shadow-sm"
                  placeholder="Search for books"
                  type="text"
                />
              </div>

              {/* Search results dropdown for mobile */}
              {text.trim() && isSearchFocused && (
                <div
                  className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 
                rounded-xl shadow-xl max-h-60 overflow-y-auto z-50"
                >
                  <div className="p-2">
                    {productList?.map((product) => {
                      if (
                        product.title.toLowerCase().includes(text.toLowerCase())
                      ) {
                        return (
                          <Link
                            to={`/productView/${product.id}`}
                            key={product.id}
                            className="block px-3 py-2 text-gray-700 hover:bg-blue-50 
                            hover:text-blue-600 transition-all duration-150 text-sm rounded-lg
                            font-medium"
                            onClick={() => setText("")}
                          >
                            {product.title}
                          </Link>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pt-4 pb-6 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  to={currentUser ? "/wishlist" : "/login"}
                  className="text-gray-700 hover:text-red-500 font-medium py-2 px-4 rounded-lg hover:bg-red-50 transition-colors flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart size={20} className="mr-3" />
                  Wishlist
                  {userWishlist?.length > 0 && (
                    <span
                      className="ml-auto bg-gradient-to-r from-red-500 to-pink-500 
                    text-white text-xs px-2 py-1 rounded-full"
                    >
                      {userWishlist.length}
                    </span>
                  )}
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={20} className="mr-3" />
                  Profile
                </Link>

                <div className="pt-4 border-t border-gray-200">
                  {currentUser ? (
                    <button
                      onClick={logout}
                      className="w-full text-red-600 hover:text-red-800 font-medium py-2 px-4 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
                    >
                      <LogOut size={20} className="mr-3" />
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="w-full text-blue-600 hover:text-blue-800 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LogIn size={20} className="mr-3" />
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
      {ismenuOn && (
        <div className="absolute -right-0 z-50  top-16     ">
          <div className="flex flex-col bg-white  p-4 shadow-sm ">
            {/* Profile icon */}
            <Link
              to="/profile"
              className=" flex space-x-2 text-gray-600 hover:text-blue-600  p-2 "
              title="Profile"
            >
              <User size={22}  /><span className="text-sm font-medium hidden lg:block">Profile</span>
            </Link>

            {/* Login / Logout icon */}
            {currentUser ? (
              <button
                onClick={logout}
                className="flex space-x-2 text-gray-600 hover:text-blue-600  p-2 "
                title="Logout"
              >
                <LogOut size={22} />
                <span className="text-sm font-medium hidden lg:block">
                  Logout
                </span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex space-x-2 text-gray-600 hover:text-blue-600  p-2 "
                title="Login"
              >
                <LogIn size={22} />
                <span className="text-sm font-medium hidden lg:block">
                  Login
                </span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
