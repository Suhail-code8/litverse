import React, { useContext, useState } from "react";
import Navbar from "../components/common/Navbar";
import { Context } from "../context/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer";

function Cart() {
  let { addToCart, userCart, byNow,setOrderedBooks,setIsSingle } = useContext(Context);
  let subTotal = Math.floor(userCart?.flatMap(x=>x.price*x.cartCount)?.reduce((a,b)=>a+b,0)*100)/100;
  let discount = Math.round(subTotal % Math.floor(subTotal)*100)/100
  let total = subTotal-discount.toFixed(2);
  const navigate = useNavigate()
  // const [orderSummary,setOrderSummary] = useState()

  function checkoutfn(){
// setOrderSummary({
//   subTotal : subTotal,
//   shipping : "free",
//   discount : discount,
//   total : total
// })
setIsSingle(false)
setOrderedBooks(userCart)
navigate("/checkout",{state: {
  subTotal : subTotal,
  shipping : "free",
  discount : discount,
  total : total
  }})

  }
    return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
        
        {userCart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                  <h2 className="text-base sm:text-lg font-medium text-gray-900">Cart Items ({userCart.length})</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {userCart.map((product, index, array) => (
                    <div key={product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {/* Product Image */}
                      <Link to={`/productView/${product.id || product._id}`} className="flex-shrink-0">
                        <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={product.image?.url}
                            alt={product.title}
                            className="w-full h-full object-contain p-4"
                          />
                        </div>
                      </Link>
                      
                      {/* Product Details */}
                      <div className="flex-grow min-w-0">
                        <Link to={`/productView/${product.id || product._id}`}>
                          <h3 className="font-medium text-gray-900 text-base sm:text-lg mb-1 hover:text-blue-600 transition-colors line-clamp-2">
                            {product.title}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-xs sm:text-sm text-gray-500 ml-1">
                            ({product.rating})
                          </span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                          <span className="text-lg sm:text-xl font-bold text-gray-900">
                            ${product.price}
                          </span>
                        </div>
                        
                        {/* Quantity Controls & Remove Button */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                            <button
                              onClick={() => addToCart(product, index, array, "decr")}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors text-sm"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 border-l border-r border-gray-300">
                              {product.cartCount}
                            </span>
                            <button
                              onClick={() => addToCart(product, index, array, "incr")}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors text-sm"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => addToCart(product, index, array, "remove")}
                            className="flex items-center text-red-600 hover:text-red-800 transition-colors text-xs sm:text-sm font-medium w-full sm:w-auto justify-center sm:justify-start"
                          >
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:sticky lg:top-20">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Subtotal</span>
                    <span className="font-medium">${subTotal}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Shipping</span>
                    <span className="font-medium">free</span>
                  </div>
                   <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Discount</span>
                    <span className="font-medium">${discount}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between text-base sm:text-lg font-bold">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
                
                <button onClick={checkoutfn} className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition-all">
                  Proceed to Checkout
                </button>
                
                <div className="mt-6 text-xs sm:text-sm text-gray-500">
                  <p className="mb-2">Free shipping on all orders</p>
                  <p>30-day easy returns</p>
                </div>
              </div>
              
              {/* Continue Shopping */}
              <div className="mt-4 lg:mt-6 text-center">
                <Link to="/products" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center text-sm sm:text-base">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        ) : (
          // Empty Cart State
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
            <svg className="w-16 sm:w-24 h-16 sm:h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 8M7 13l-1.5-8M13 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8-2V9a2 2 0 00-2-2H9a2 2 0 00-2 2v2.01" />
            </svg>
            
            <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 text-sm sm:text-base">Looks like you haven't added any items to your cart yet.</p>
            
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Cart;