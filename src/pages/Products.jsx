import React, { useContext } from "react";
import Navbar from "../components/common/Navbar";
import { Context } from "../context/ProductContext";
import { Link } from "react-router-dom";
import HomeFooter from "../components/ui/HomeFooter";
import Footer from "../components/common/Footer";
import { BackendProductContext } from "../context/BackendProductContext";

function Products() {
  const { currentUser, addToCart, addToWishlist, userWishlist } =
    useContext(Context);
  const {
    books: productList,
    filteredBooks: filteredList,
    setFilteredBooks: setfilteredList,
    loading,
  } = useContext(BackendProductContext);
  function ratingfn(product) {
    const ratings = product.reviews?.map((x) => x.rating) || [];
    if (ratings.length > 0) {
      return (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
    } else {
      return product.rating;
    }
  }

  //functions for filtering products :-

  function filterfiction() {
    try {
      setfilteredList(productList.filter((val) => val.category === "Fiction"));
    } catch (err) {
      console.log("Error : ", err);
    }
  }

  function filternon() {
    try {
      setfilteredList(
        productList.filter((val) => val.category === "Non-Fiction")
      );
    } catch (err) {
      console.log("Error : ", err);
    }
  }

  function filterrating() {
    try {
      setfilteredList(productList.filter((val) => val.rating >= 4.5));
    } catch (err) {
      console.log("Error : ", err);
    }
  }

  function resetfilter() {
    try {
      setfilteredList(productList);
    } catch (err) {
      console.log("Error : ", err);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center py-20 text-gray-600">
          Loading books...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Navbar />

      {/* Filter Section */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          {/* Title for mobile */}
          <div className="flex items-center justify-center mb-4 md:mb-0 md:hidden">
            <svg
              className="w-5 h-5 text-gray-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
              />
            </svg>
            <span className="text-gray-700 font-semibold">Filter Books:</span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-3 lg:space-x-4">
            {/* Title for desktop */}
            <div className="hidden md:flex items-center space-x-2 mr-0 lg:mr-8">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                />
              </svg>
              <span className="text-gray-700 font-semibold">Filter:</span>
            </div>

            <div className="grid grid-cols-2  gap-3 sm:flex sm:flex-wrap sm:justify-center">
              <button
                onClick={filterfiction}
                className="px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white 
            rounded-full font-medium text-sm sm:text-base shadow-md hover:shadow-lg hover:from-purple-600 
            hover:to-purple-700 transition-all duration-200 transform hover:scale-105 whitespace-nowrap"
              >
                Fiction
              </button>

              <button
                onClick={filternon}
                className="px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 bg-gradient-to-r from-green-500 to-green-600 text-white 
            rounded-full font-medium text-sm sm:text-base shadow-md hover:shadow-lg hover:from-green-600 
            hover:to-green-700 transition-all duration-200 transform hover:scale-105 whitespace-nowrap"
              >
                Non-Fiction
              </button>

              <button
                onClick={filterrating}
                className="px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white 
            rounded-full font-medium text-sm sm:text-base shadow-md hover:shadow-lg hover:from-yellow-600 
            hover:to-yellow-700 transition-all duration-200 transform hover:scale-105 whitespace-nowrap"
              >
                <span className="hidden xs:inline">Above </span>4.5⭐
              </button>
              <button
                onClick={resetfilter}
                className="px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white 
            rounded-full font-medium text-sm sm:text-base shadow-md hover:shadow-lg hover:from-gray-600 
            hover:to-gray-700 transition-all duration-200 transform hover:scale-105 whitespace-nowrap 
            flex items-center justify-center space-x-1 sm:space-x-2"
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
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Book Collection
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Discover amazing stories and expand your knowledge with our curated
            selection
          </p>
        </div>

        {filteredList.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filteredList.map((product, index, array) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 
                  overflow-hidden group border border-gray-100 hover:border-blue-200
                  hover:-translate-y-1 sm:hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <Link to={`/productView/${product._id}`}>
                    <img
                      src={product.image?.url}
                      alt={product.title}
                      className="w-full h-60 sm:h-72 object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <button
                      onClick={() => addToWishlist(product, index, array)}
                      className="bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg 
                        hover:scale-110 transition-all duration-200 group-hover:bg-white"
                    >
                      {userWishlist?.some(
                        (val) =>
                          val._id === product._id ||
                          val.book?._id === product._id
                      ) ? (
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 
                              0 115.656 5.656L10 17.657l-6.828-6.829a4 4 
                              0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 hover:text-red-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 016.364 0L12 
                              7.636l1.318-1.318a4.5 4.5 0 116.364 
                              6.364L12 20.364l-7.682-7.682a4.5 
                              4.5 0 010-6.364z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                      px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-lg font-bold shadow-lg"
                    >
                      ${product.price}
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <Link to={`/productView/${product._id}`}>
                    <h3
                      className="font-bold text-lg sm:text-xl text-gray-800 mb-2 sm:mb-3 line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem]
                      hover:text-blue-600 transition-colors duration-200"
                    >
                      {product.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-4 sm:mb-6">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${
                              index < Math.round(product.rating)
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
                      <span className="text-xs sm:text-sm text-gray-500 ml-2 font-medium">
                        ({ratingfn(product)})
                      </span>
                    </div>
                  </Link>

                  <button
                    onClick={() =>
                      addToCart(product, index, array, "checkincr")
                    }
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 
                      hover:to-indigo-700 text-white py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold transition-all 
                      duration-200 flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl
                      transform hover:scale-[1.02] text-sm sm:text-base"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
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
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-sm">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No books found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={resetfilter}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Footer Section */}
      <section className="bg-white pt-12">
        <HomeFooter />
        <Footer />
      </section>
    </div>
  );
}

export default Products;
