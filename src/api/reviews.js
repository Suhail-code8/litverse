import api from "./axios";

export function getReviews(bookId) {
  return api.get(`/api/review/${bookId}`);
}

export function addReview(data) {
  return api.post("/api/review", data);
}
