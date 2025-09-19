import React from 'react'
import Navbar from '../components/common/Navbar'
import { useLocation } from 'react-router-dom'

function ProductView() {
  const location = useLocation()
  const product = location.state

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Home</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span>Products</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-900">{product?.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Section */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              <img 
                src={product?.image} 
                alt={product?.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images (if multiple images exist) */}
            <div className="flex space-x-3">
              <div className="w-20 h-20 bg-white rounded-lg border-2 border-blue-500 overflow-hidden cursor-pointer">
                <img 
                  src={product?.image} 
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-20 h-20 bg-gray-100 rounded-lg border overflow-hidden cursor-pointer">
                <img 
                  src={product?.image} 
                  alt="Thumbnail"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              <div className="w-20 h-20 bg-gray-100 rounded-lg border overflow-hidden cursor-pointer">
                <img 
                  src={product?.image} 
                  alt="Thumbnail"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            {/* Product Title & Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {product?.title}
              </h1>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg 
                      key={index} 
                      className={`w-5 h-5 ${index < Math.floor(product?.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">({product?.rating}) • 124 reviews</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="border-b pb-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-blue-600">
                  ${product?.price}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ${(product?.price * 1.2).toFixed(2)}
                </span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                  17% OFF
                </span>
              </div>
              <p className="text-green-600 font-medium">In Stock • Free Shipping</p>
            </div>

            {/* Product Description */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                eu fugiat nulla pariatur.
              </p>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border rounded-lg">
                  <button className="p-2 hover:bg-gray-50 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="px-4 py-2 border-x min-w-[60px] text-center">1</span>
                  <button className="p-2 hover:bg-gray-50 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 8M7 13l-1.5-8M13 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8-2V9a2 2 0 00-2-2H9a2 2 0 00-2 2v2.01" />
                  </svg>
                  Add to Cart
                </button>
                
                <button className="p-3 border border-gray-300 hover:border-red-400 hover:bg-red-50 rounded-lg transition-colors group">
                  <svg className="w-6 h-6 text-gray-600 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition-colors">
                Buy Now
              </button>
            </div>

            {/* Product Features */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Product Features</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Quality Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Easy Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 border-t pt-16">
          <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
          
          {/* Review Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{product?.rating}</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, index) => (
                    <svg 
                      key={index} 
                      className={`w-5 h-5 ${index < Math.floor(product?.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-gray-600">Based on 124 reviews</div>
              </div>
              
              <div className="md:col-span-2">
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="text-sm w-8">{stars}★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full" 
                          style={{ width: `${Math.random() * 80 + 20}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">{Math.floor(Math.random() * 50)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6">
            {[1, 2, 3].map((review) => (
              <div key={review} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">JD</span>
                    </div>
                    <div>
                      <div className="font-semibold">John Doe</div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, index) => (
                            <svg 
                              key={index} 
                              className={`w-4 h-4 ${index < 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">2 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  Great product! The quality exceeded my expectations. Delivery was fast and packaging was excellent. 
                  Would definitely recommend to others and purchase again.
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors">
              Load More Reviews
            </button>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 border-t pt-16">
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100"></div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Related Product {item}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold">$29.99</span>
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <svg 
                          key={index} 
                          className={`w-4 h-4 ${index < 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductView