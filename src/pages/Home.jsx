import React, { useContext } from "react";
import Navbar from "../components/common/Navbar";
import { Context } from "../context/ProductContext";
import { Link } from "react-router-dom";
import HomeFooter from "../components/ui/HomeFooter";
import HeroCarousel from "../components/ui/heroSec";
import Footer from "../components/common/Footer";
import Spinner from "../components/ui/LoaadingSpinner";
import { BackendProductContext } from "../context/BackendProductContext";
import { Heart, ShoppingCart, Star, TrendingUp } from "lucide-react";

function Home() {
  const { addToCart, addToWishlist, userWishlist } = useContext(Context);
  const { books: productList, loading } = useContext(BackendProductContext);

  const featuredProducts = productList.slice(0, 8);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <HeroCarousel books={productList.slice(0, 3)} />

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Trending Now</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Books
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Curated collection of bestsellers and must-reads handpicked just for you
          </p>
        </div>

        {featuredProducts.length > 0 ? (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => {
                const isInWishlist = userWishlist?.some((item) => item._id === product._id);

                return (
                  <div
                    key={product._id || product.id}
                    className="group relative"
                  >
                    {/* Product Card */}
                    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-300 transition-all duration-300 h-full flex flex-col">
                      
                      {/* Image Container */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                        <Link to={`/productView/${product._id || product.id}`}>
                          <img
                            src={product.image?.url}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </Link>

                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Wishlist Button */}
                        <button
                          onClick={() => addToWishlist(product)}
                          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg ${
                            isInWishlist
                              ? "bg-red-500 text-white scale-100"
                              : "bg-white/90 text-gray-700 scale-90 group-hover:scale-100"
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
                        </button>

                        {/* Stock Badge */}
                        {product.stock > 0 && product.stock < 10 && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                              {product.stock} LEFT
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-5 flex-1 flex flex-col">
                        <Link to={`/productView/${product._id || product.id}`} className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[3.5rem]">
                            {product.title}
                          </h3>

                          <p className="text-sm text-gray-600 mb-3 font-medium">
                            {product.author}
                          </p>

                          {/* Rating */}
                          {product.rating && (
                            <div className="flex items-center gap-2 mb-4">
                              <div className="flex">
                                {[...Array(5)].map((_, index) => (
                                  <Star
                                    key={index}
                                    className={`w-4 h-4 ${
                                      index < Math.round(product.rating)
                                        ? "text-amber-400 fill-amber-400"
                                        : "text-gray-300 fill-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm font-semibold text-gray-700">
                                {product.rating}
                              </span>
                            </div>
                          )}

                          {/* Price */}
                          <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-3xl font-bold text-gray-900">
                              ${product.price}
                            </span>
                          </div>
                        </Link>

                        {/* Add to Cart Button */}
                        <button
                          onClick={() => addToCart(product)}
                          disabled={product.stock === 0}
                          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                        </button>
                      </div>
                    </div>

                    {/* Hover Shadow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10"></div>
                  </div>
                );
              })}
            </div>

            {/* View All Button */}
            <div className="text-center mt-16">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Explore All Books
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products available at the moment</p>
          </div>
        )}
      </section>

      <HomeFooter />
      <Footer />
    </div>
  );
}

export default Home;