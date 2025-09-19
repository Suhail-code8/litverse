import React, { useContext } from 'react'
import Navbar from '../components/common/Navbar'
import { Context } from '../context/ProductContext'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/common/Footer'

function WishList() {
  let { addToCart, addToWishlist, userWishlist } = useContext(Context)
  let navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
          <span className="text-gray-500">
            {userWishlist.length} {userWishlist.length === 1 ? 'item' : 'items'}
          </span>
        </div>
        
        {userWishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userWishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 group"
              >
                <div className="relative">
                  <Link to={`/productView/${product.id}`}>
                    <div className="aspect-square bg-gray-100 flex items-center justify-center p-6">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  
                  {/* Wishlist Button */}
                  <button
                    onClick={() => addToWishlist(product)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform duration-200"
                  >
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div className="p-4">
                  <Link to={`/productView/${product.id}`}>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 h-12 text-sm leading-tight">
                      {product.title}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`w-3 h-3 ${
                            index < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product.rating})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product, "incr")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
                  >
                    <svg
                      className="w-4 h-4"
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
        ) : (
          // Empty Wishlist State
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Save your favorite items here to easily find them later. Click the heart icon on any product to add it to your wishlist.
            </p>
            
            <button 
              onClick={() => navigate("/products")}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Continue Shopping
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}
        
        {/* Back to Shopping Link (shown only when wishlist has items) */}
        {userWishlist.length > 0 && (
          <div className="mt-12 text-center">
            <button 
              onClick={() => navigate("/products")}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default WishList