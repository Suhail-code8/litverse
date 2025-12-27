import React, { useState, useMemo, useContext } from "react";
import { Star, ChevronDown, MessageCircle, TrendingUp, Calendar } from "lucide-react";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CustomerReviews = ({ reviews, setReviews, bookId }) => {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState("newest");
  const [filterRating, setFilterRating] = useState("all");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  // Rating Stats Calculation
  const ratingStats = useMemo(() => {
    if (!reviews.length) {
      return { avgRating: 0, totalReviews: 0, ratingBreakdown: [0, 0, 0, 0, 0] };
    }

    const ratings = reviews.map((r) => r.rating);
    const totalReviews = ratings.length;
    const avgRating = (ratings.reduce((a, b) => a + b, 0) / totalReviews).toFixed(1);

    const ratingBreakdown = [5, 4, 3, 2, 1].map(
      (star) => ratings.filter((r) => r === star).length
    );

    return { avgRating, totalReviews, ratingBreakdown };
  }, [reviews]);

  // Filter and Sort Reviews
  const filteredReviews = useMemo(() => {
    return reviews
      .filter((r) => (filterRating === "all" ? true : r.rating === Number(filterRating)))
      .sort((a, b) => {
        if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
        if (sortBy === "highest") return b.rating - a.rating;
        if (sortBy === "lowest") return a.rating - b.rating;
        return 0;
      });
  }, [reviews, filterRating, sortBy]);

  // Submit Review
  async function submitReview() {
    if (!newReview.comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    try {
      await api.post("/api/reviews", {
        bookId,
        rating: newReview.rating,
        comment: newReview.comment,
      });

      toast.success("Review submitted successfully!");

      setReviews((prev) => [
        {
          rating: newReview.rating,
          comment: newReview.comment,
          createdAt: new Date().toISOString(),
          user: { name: "You" },
        },
        ...prev,
      ]);

      setNewReview({ rating: 5, comment: "" });
      setShowReviewForm(false);
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Please login to write a review");
        navigate("/login");
      } else if (err.response?.status === 409) {
        toast.error("You've already reviewed this book");
      } else {
        toast.error("Failed to submit review");
      }
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              Customer Reviews
            </h2>
            <p className="text-gray-600">Share your experience with other customers</p>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" />
            Write Review
          </button>
        </div>

        {/* Rating Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Average Rating */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-1">
                {ratingStats.avgRating}
              </div>
              <div className="flex justify-center mb-1">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-5 h-5 ${
                      idx < Math.round(ratingStats.avgRating)
                        ? "text-amber-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">
                {ratingStats.totalReviews} {ratingStats.totalReviews === 1 ? "review" : "reviews"}
              </p>
            </div>

            {/* Rating Breakdown */}
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((star, idx) => {
                const count = ratingStats.ratingBreakdown[idx];
                const percentage = ratingStats.totalReviews > 0
                  ? (count / ratingStats.totalReviews) * 100
                  : 0;

                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 w-8">{star}★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-10 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="p-6 sm:p-8 bg-gray-50 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Write Your Review</h3>
          
          <div className="space-y-4">
            {/* Rating Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Rating *
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoverRating || newReview.rating)
                          ? "text-amber-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Textarea */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Review *
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                rows="5"
                placeholder="Share your experience with this book..."
              />
              <p className="text-xs text-gray-500 mt-2">
                {newReview.comment.length} / 1000 characters
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3">
              <button
                onClick={submitReview}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Submit Review
              </button>
              <button
                onClick={() => {
                  setShowReviewForm(false);
                  setNewReview({ rating: 5, comment: "" });
                }}
                className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-xl font-semibold border border-gray-300 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="p-6 sm:p-8 border-b border-gray-200 bg-white">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Filter by Rating */}
          <div className="relative flex-1">
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2.5 pr-10 text-gray-700 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
            >
              <option value="all">All Ratings</option>
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r !== 1 ? "s" : ""}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
          </div>

          {/* Sort by */}
          <div className="relative flex-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2.5 pr-10 text-gray-700 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="p-6 sm:p-8">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
            <p className="text-gray-600 mb-4">Be the first to share your thoughts!</p>
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Write a Review
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((review, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {review.user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.user?.name || "Anonymous"}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(review.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                    <span className="font-semibold text-amber-700">{review.rating}</span>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerReviews;