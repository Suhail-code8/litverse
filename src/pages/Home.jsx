import React, { useContext, useState } from "react";
import Navbar from "../components/common/Navbar";
import { Context } from "../context/ProductContext";
import { Link } from "react-router-dom";
import HomeFooter from "../components/ui/HomeFooter";
import HeroCarousel from "../components/ui/heroSec";
import Footer from "../components/common/Footer";
import Spinner from "../components/ui/LoaadingSpinner";

function Home() {
  const { productList, currentUser, addToCart, addToWishlist, userWishlist,loading } =
    useContext(Context);
  // Show only first 8 products on home page
  const featuredProducts = productList.slice(0, 8);
  
   if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      {/* <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to LitVerse</h1>
          <p className="text-xl mb-8 opacity-90">
            Discover amazing books and build your perfect library
          </p>
          <Link
            to="/products"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300 inline-block"
          >
            Shop All Books
          </Link>
        </div>
      </section> */}
      <section>
        <HeroCarousel />
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Featured Books
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked selection of our most popular and trending books just for
            you
          </p>
        </div>

        {featuredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index, array) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <Link to={`/productView/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  </Link>
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => addToWishlist(product, index, array)}
                      className="bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform duration-200"
                    >
                      {userWishlist?.some((val) => val.id === product.id) ? (
                        // Filled heart when product is in wishlist
                        <svg
                          className="w-6 h-6 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        // Outline heart when not in wishlist
                        <svg
                          className="w-6 h-6 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  
                </div>

                <div className="p-6">
                  <Link to={`/productView/${product.id}`}>
                  <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {product.title}
                  </h3>
                        
                  <div className="flex items-center gap-1 mb-3">
                    
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-4 h-4 ${index < Math.round(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                          }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-gray-500 ml-1">
                      ({product.rating})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      ${(product.price)}
                    </span>
                  </div>
                    </Link>
                  <button
                    onClick={() => addToCart(product, index, array, "checkincr")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 8M7 13l-1.5-8M13 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8-2V9a2 2 0 00-2-2H9a2 2 0 00-2 2v2.01"
                      />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {featuredProducts.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 inline-block transform hover:scale-105"
            >
              View All Books →
            </Link>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
       <HomeFooter /> 
      </section>
      <Footer />
    </div>
  );
}

export default Home;
