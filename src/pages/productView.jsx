import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/common/Navbar";
import { useParams } from "react-router-dom";
import { Context } from "../context/ProductContext";
import { Link } from "react-router-dom";
import Footer from "../components/common/Footer";
import api from "../api/axios";
import CustomerReviews from "../components/ui/reviews";
import { ShoppingCart, Heart, Truck, Shield, RotateCcw, CreditCard } from "lucide-react";

function ProductView() {
  const { id } = useParams();
  const { addToCart, addToWishlist, byNow, userWishlist } = useContext(Context);

  const [prod, setProd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await api.get(`/api/books/${id}`);
        setProd(res.data.book || res.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    }

    async function fetchReviews() {
      try {
        const res = await api.get(`/api/reviews/${id}`);
        setReviews(res.data.reviews || []);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
        setReviews([]);
      }
    }

    fetchProduct();
    fetchReviews();
  }, [id]);

  let xprice = prod?.price;
  let price = ((prod?.price / 2.5) * (Math.random() + 1)).toFixed(2);
  let off = Math.floor(((xprice - price) * 100) / xprice);
  let product = { ...prod, price };

  const ratings = reviews.map((r) => r.rating);
  const reviewCount = ratings.length;
  const avgRatings =
    ratings.length > 0
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : 0;

  let stockStatus;
  let stockColor;
  if (product?.stock > 10) {
    stockStatus = "In Stock";
    stockColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
  } else if (product?.stock > 0) {
    stockStatus = `Only ${product.stock} left`;
    stockColor = "bg-amber-50 text-amber-700 border-amber-200";
  } else {
    stockStatus = "Out of Stock";
    stockColor = "bg-red-50 text-red-700 border-red-200";
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!prod) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Product not found</p>
          <Link to="/products" className="text-blue-600 hover:underline mt-2 inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const isWishlisted = product && userWishlist?.some((val) => val.id === product.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-gray-900 transition-colors">
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate max-w-xs">{product?.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Product Image Section */}
          <div className="lg:col-span-5">
            <div className="sticky top-6">
              <div className="relative bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="aspect-square p-8">
                  <img
                    src={product?.image?.url}
                    alt={product?.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Discount Badge */}
                {off > 0 && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-md">
                      {off}% OFF
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="lg:col-span-7 space-y-6">
            {/* Title and Author */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {product?.title}
              </h1>
              <p className="text-lg text-gray-600">
                by <span className="font-semibold text-gray-800">{product?.author}</span>
              </p>
            </div>

            {/* Rating and Stock */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${
                        index < Math.round(avgRatings) ? "text-amber-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-semibold text-gray-900">{avgRatings}</span>
                <span className="text-gray-500">({reviewCount} reviews)</span>
              </div>

              <div className={`px-3 py-1.5 rounded-lg border font-medium text-sm ${stockColor}`}>
                {stockStatus}
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">${price}</span>
                <span className="text-xl text-gray-500 line-through">${xprice}</span>
                <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                  Save ${(xprice - price).toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-600">Inclusive of all taxes</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => addToCart(product)}
                disabled={product?.stock === 0}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3.5 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>

              <button
                onClick={() => addToWishlist(product)}
                className={`p-3.5 rounded-xl border-2 transition-all duration-200 ${
                  isWishlisted
                    ? "bg-red-50 border-red-300 text-red-600"
                    : "bg-white border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-600"
                }`}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
            </div>

            <button
              onClick={() => byNow(product)}
              disabled={product?.stock === 0}
              className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Buy Now
            </button>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Truck, text: "Free Delivery", color: "text-blue-600" },
                { icon: Shield, text: "Quality Guaranteed", color: "text-emerald-600" },
                { icon: RotateCcw, text: "Easy Returns", color: "text-amber-600" },
                { icon: CreditCard, text: "Secure Payment", color: "text-purple-600" },
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                    <Icon className={`w-5 h-5 ${benefit.color}`} />
                    <span className="text-sm font-medium text-gray-700">{benefit.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold mb-3 text-gray-900">About This Book</h3>
              <p className="text-gray-700 leading-relaxed">{product?.description}</p>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <CustomerReviews reviews={reviews} bookId={id} setReviews={setReviews} />
      </div>
      
      <Footer />
    </div>
  );
}

export default ProductView;