import React, { useState, useMemo } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Filter,
  Star,
  Plus,
} from "lucide-react";

const CustomerReviews = (props) => {
  const product = props?.value;
  const [sortBy, setSortBy] = useState("newest");
  const [filterRating, setFilterRating] = useState("all");
  const [reviews, setReviews] = useState(product?.reviews || []);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    comment: "",
    name: "",
    email: "",
  });

  // Get reviews with proper fallback

  // Calculate rating statistics (includes all reviews, even empty ones)
  const ratingStats = useMemo(() => {
    if (!reviews?.length) {
      return {
        avgRating: 0,
        totalReviews: 0,
        ratingBreakdown: [0, 0, 0, 0, 0],
      };
    }

    // Include all reviews for statistics, even with empty review text
    const ratings = reviews
      .map((review) => review?.rating || 0)
      .filter((rating) => rating > 0);
    const totalReviews = ratings.length;
    if (totalReviews === 0) {
      return {
        avgRating: 0,
        totalReviews: 0,
        ratingBreakdown: [0, 0, 0, 0, 0],
      };
    }

    const avgRating = (
      ratings.reduce((sum, rating) => sum + rating, 0) / totalReviews
    ).toFixed(1);

    // Count ratings [5-star, 4-star, 3-star, 2-star, 1-star]
    const ratingBreakdown = [5, 4, 3, 2, 1].map(
      (star) => ratings.filter((rating) => rating === star).length
    );

    return { avgRating, totalReviews, ratingBreakdown };
  }, [reviews]);

  const { avgRating, totalReviews, ratingBreakdown } = ratingStats;

  const handleSubmitReview = () => {
    // Validate required fields
    if (
      !newReview?.name?.trim() ||
      !newReview?.email?.trim() ||
      !newReview?.title?.trim() ||
      !newReview?.comment?.trim()
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Handle review submission here
    console.log("New review:", newReview);
    setReviews((prev) => [...prev, newReview]);
    setShowReviewForm(false);
    setNewReview({ rating: 5, title: "", comment: "", name: "", email: "" });
  };

  const filteredReviews = useMemo(() => {
    if (!reviews?.length) return [];

    return reviews
      .filter((review) => {
        if (!review) return false;
        // Filter out reviews with empty or whitespace-only review text
        if (!review?.review?.trim()) return false;
        // Apply rating filter
        return (
          filterRating === "all" || review?.rating === parseInt(filterRating)
        );
      })
      .sort((a, b) => {
        if (!a || !b) return 0;

        switch (sortBy) {
          case "newest":
            return new Date(b?.date || 0) - new Date(a?.date || 0);
          case "oldest":
            return new Date(a?.date || 0) - new Date(b?.date || 0);
          case "highest":
            return (b?.rating || 0) - (a?.rating || 0);
          case "lowest":
            return (a?.rating || 0) - (b?.rating || 0);
          case "helpful":
            // Since your JSON doesn't have helpful counts, sort by rating as fallback
            return (b?.rating || 0) - (a?.rating || 0);
          default:
            return 0;
        }
      });
  }, [reviews, filterRating, sortBy]);

  // Generate avatar URL with fallback
  const getAvatarUrl = (reviewer) => {
    if (!reviewer)
      return "https://ui-avatars.com/api/?name=Anonymous&background=6b7280&color=fff";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      reviewer
    )}&background=3b82f6&color=fff`;
  };

  // Format date with fallback
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "Date not available";
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200 mb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
          Customer Reviews ({totalReviews})
        </h3>
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Write a Review
        </button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h4 className="text-lg font-semibold mb-4">Write Your Review</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={newReview?.name || ""}
                onChange={(e) =>
                  setNewReview({ ...newReview, name: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={newReview?.email || ""}
                onChange={(e) =>
                  setNewReview({ ...newReview, email: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer transition-colors ${
                      star <= (newReview?.rating || 1)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                  />
                ))}
              </div>
            </div>

            <input
              type="text"
              placeholder="Review Title"
              value={newReview?.title || ""}
              onChange={(e) =>
                setNewReview({ ...newReview, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <textarea
              placeholder="Write your review..."
              value={newReview?.comment || ""}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            ></textarea>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSubmitReview}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md font-medium transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rating Summary & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Rating Summary */}
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <div className="text-5xl font-bold text-gray-900 mb-2">
            {avgRating || "0"}
          </div>
          <div className="flex justify-center mb-3">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-6 h-6 mx-0.5 ${
                  index < Math.round(avgRating || 0)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-gray-600">
            Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="md:col-span-2">
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((stars, index) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-sm font-medium w-6 text-gray-700">
                  {stars}★
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{
                      width:
                        totalReviews > 0
                          ? `${
                              ((ratingBreakdown?.[index] || 0) * 100) /
                              totalReviews
                            }%`
                          : "0%",
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-6 font-medium">
                  {ratingBreakdown?.[index] || 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Show message if no reviews at all */}
      {!reviews?.length ? (
        <div className="text-center py-12 text-gray-500">
          <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h4 className="text-lg font-semibold mb-2">No reviews yet</h4>
          <p>Be the first to review this product!</p>
        </div>
      ) : (
        <>
          {/* Filters and Sort - Always visible when there are reviews */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Filter by:
              </span>
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>

          {/* Reviews List or Empty State */}
          <div className="space-y-6">
            {filteredReviews?.length > 0 ? (
              filteredReviews.map((review, index) => (
                <div
                  key={review?.id || index}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow duration-200"
                >
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={getAvatarUrl(review?.reviewer)}
                        alt={review?.reviewer || "Anonymous"}
                        className="w-12 h-12 rounded-full"
                        onError={(e) => {
                          e.target.src =
                            "https://ui-avatars.com/api/?name=User&background=6b7280&color=fff";
                        }}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-semibold text-gray-900">
                            {review?.reviewer || "Anonymous"}
                          </h5>
                          {review?.verified && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, starIndex) => (
                              <Star
                                key={starIndex}
                                className={`w-4 h-4 ${
                                  starIndex < (review?.rating || 0)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {formatDate(review?.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="mb-4">
                    <p className="text-gray-700 leading-relaxed">
                      {review?.review || "No review provided."}
                    </p>
                  </div>

                  {/* Review Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">Helpful</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors duration-200">
                        <ThumbsDown className="w-4 h-4" />
                        <span className="text-sm">Not Helpful</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">Reply</span>
                      </button>
                    </div>
                    <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
                      Report
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h4 className="text-lg font-semibold mb-2">
                  {filterRating === "all"
                    ? "No written reviews to display"
                    : `No ${filterRating}-star written reviews found`}
                </h4>
                <p className="mb-4">
                  {filterRating === "all"
                    ? "All reviews for this product are ratings without written comments."
                    : `Try selecting "All Ratings" or a different star rating to see more reviews.`}
                </p>
                {filterRating !== "all" && (
                  <button
                    onClick={() => setFilterRating("all")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Load More Button */}
          {filteredReviews?.length > 0 && (
            <div className="text-center mt-8">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                Load More Reviews
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerReviews;
