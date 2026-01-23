import React, { useContext } from "react";
import Navbar from "../components/common/Navbar";
import { Context } from "../context/ProductContext";
import { Link } from "react-router-dom";
import FeaturesSection from "../components/ui/FeaturesSection";
import HeroCarousel from "../components/ui/heroSec";
import CategorySection from "../components/ui/CategorySection";
import Footer from "../components/common/Footer";
import Spinner from "../components/ui/LoaadingSpinner";
import { BackendProductContext } from "../context/BackendProductContext";
import { Heart, ShoppingCart, Star, TrendingUp, ArrowRight } from "lucide-react";

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
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <HeroCarousel books={productList.slice(0, 5)} />

      {/* Features Section */}
      <FeaturesSection />

      {/* Categories Section */}
      <CategorySection />

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">
                <TrendingUp className="w-4 h-4" />
                <span>Trending Now</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Featured Books
              </h2>
              <p className="text-lg text-gray-600 max-w-xl">
                Curated collection of bestsellers and must-reads handpicked just for you
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-gray-900 font-bold hover:text-blue-600 transition-colors group"
            >
              View All Books
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => {
                const isInWishlist = userWishlist?.some((item) => item._id === product._id);

                return (
                  <div
                    key={product._id || product.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                      <Link to={`/productView/${product._id || product.id}`}>
                        <img
                          src={product.image?.url}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </Link>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <button
                          onClick={() => addToCart(product)}
                          disabled={product.stock === 0}
                          className="bg-white text-gray-900 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
                          title="Add to Cart"
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => addToWishlist(product)}
                          className={`p-3 rounded-full transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 ${isInWishlist
                              ? "bg-red-500 text-white"
                              : "bg-white text-gray-900 hover:bg-red-500 hover:text-white"
                            }`}
                          title="Add to Wishlist"
                        >
                          <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
                        </button>
                      </div>

                      {/* Stock Badge */}
                      {product.stock > 0 && product.stock < 10 && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                            Only {product.stock} left
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <div className="mb-2">
                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                          {product.category || "Book"}
                        </p>
                        <Link to={`/productView/${product._id || product.id}`}>
                          <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {product.title}
                          </h3>
                        </Link>
                        <p className="text-gray-500 text-sm mt-1">{product.author}</p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="font-bold text-gray-900">{product.rating || "4.5"}</span>
                          <span className="text-gray-400 text-sm">/5</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">
                          ${product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">No products available at the moment</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;