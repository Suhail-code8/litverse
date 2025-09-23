import React, { useContext } from "react";
import Navbar from "../components/common/Navbar";
import { useParams } from "react-router-dom";
import { Context } from "../context/ProductContext";
import { Link } from "react-router-dom";
import Footer from "../components/common/Footer";
import CustomerReviews from "../components/ui/reviews";

function ProductView() {
  const { id } = useParams();
  let { addToCart, addToWishlist, byNow, productList, userWishlist } =
    useContext(Context);
  const prod = productList.find((val) => String(val.id) === id);
  let xprice = prod?.price,
    price = ((prod?.price / 2.5) * (Math.random() + 1)).toFixed(2),
    off = Math.floor(((xprice - price) * 100) / xprice);
  let product = { ...prod, price: price };
  // let reviewCount = Math.floor((Math.random()*10)**3)+20
  // let x = reviewCount/10
  // let p1 = Math.floor(x/2),p2 = Math.floor(x/5),p3 = Math.floor(x/3),p4 = Math.floor(x/1.5),p5 = reviewCount-(p4+p3+p2+p1)
  // let reviewArr = [p5,p4,p3,p2,p1]
  let ratings = prod?.reviews?.flatMap((x) => x.rating);
  let sum = 0;
  let reviewCount =  ratings?.length;
  let p1 = 0,
    p2 = 0,
    p3 = 0,
    p4 = 0,
    p5 = 0;
  if (ratings) {
    for (let r of ratings) {
      sum += r;
      switch (r) {
        case 1:
          p1++;
          break;
        case 2:
          p2++;
          break;
        case 3:
          p3++;
          break;
        case 4:
          p4++;
          break;
        case 5:
          p5++;
          break;
      }
    }
  }
  let avgRatings = sum>0? (sum / ratings?.length).toFixed(1) : 0
  let reviewArr = [p5, p4, p3, p2, p1];
  let stock;

  if (product.stock > 10) {
    stock = (
      <span className="bg-green-500 text-white px-3 py-1 rounded-md text-xs font-medium">
        In Stock
      </span>
    );
  } else if (product?.stock <= 10 && product.stock) {
    stock = (
      <span className="bg-orange-500 text-white px-3 py-1 rounded-md text-xs font-medium">
        Only {product?.stock} left
      </span>
    );
  } else {
    stock = (
      <span className="bg-red-500 text-white px-3 py-1 rounded-md text-xs font-medium">
        Out of Stock!
      </span>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="hover:text-blue-600 transition-colors cursor-pointer">
              <Link to="/">Home</Link>
            </span>
            <span>/</span>
            <span className="hover:text-blue-600 transition-colors cursor-pointer">
              <Link to="/products">Products</Link>
            </span>
            <span>/</span>
            <span className="text-gray-900">{product?.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
          {/* Product Image Section */}
          <div>
            <div className="relative group">
              <div className="aspect-square bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <img
                  src={product?.image}
                  alt={product?.title}
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out p-8"
                />
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs font-medium">
                  {`${off}% OFF`}
                </span>
              </div>

              <div className="absolute top-4 right-4 z-10">{stock}</div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            {/* Product Title & Rating */}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-gray-900">
                {product?.title}
              </h1>
              <p className="text-gray-600 text-lg">
                by{" "}
                <span className="font-medium text-gray-800">
                  {product?.author}
                </span>
              </p>

              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${
                        index < Math.round(avgRatings)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600 text-sm">
                    ({avgRatings})
                  </span>
                </div>
                <span className="text-gray-500 text-sm">{reviewCount}</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${price}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ${xprice}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-green-600">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Free Shipping</span>
                </div>
                <div className="w-1 h-4 bg-gray-300 rounded-full"></div>
                <span className="text-gray-600">Fast Delivery</span>
              </div>
            </div>

            {/* Product Description */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product?.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
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

                <button
                  onClick={() => addToWishlist(product)}
                  className="bg-white p-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors duration-200"
                >
                  {product &&
                  userWishlist?.some((val) => val.id === product.id) ? (
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
                    <svg
                      className="w-6 h-6 text-gray-600 hover:text-red-500 transition-colors duration-200"
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

              <button
                onClick={() => byNow(product)}
                className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Buy Now
              </button>
            </div>

            {/* Product Features */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Product Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { text: "Fast Delivery", icon: "🚚" },
                  { text: "Quality Guaranteed", icon: "✅" },
                  { text: "Easy Returns", icon: "↩️" },
                  { text: "Secure Payment", icon: "🔒" },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-xl">{feature.icon}</span>
                    <span className="text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <CustomerReviews value={prod}/>
      </div>
      <Footer />
    </div>
  );
}

export default ProductView;
