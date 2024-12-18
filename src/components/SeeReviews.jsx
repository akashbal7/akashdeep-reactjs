import React, { useState, forwardRef, useEffect } from "react";
import Review from "./Review";
import { assets } from "../assets/assets";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthProvider";

// Review card component
const SeeReviews = forwardRef(({ onClose, reviewType, food_id }, ref) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { loggedInUser } = useAuth();
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const closeModal = () => {
    onClose();
  };
  console.log("review type", reviewType);
  const reviewList = [
    {
      id: 1,
      name: "Beant Gohal",
      avatar: "https://via.placeholder.com/40", // Replace with actual image
      role: "Local Guide",
      rating: 5,
      date: "2 days ago",
      text: "I recently dined at Punjabi by Nature and had an amazing experience. The food was absolutely delicious...I recently dined at Punjabi by Nature and had an amazing experience. The food was absolutely delicious...",
      images: [], // No images for this review
    },
  ];

  useEffect(() => {
    const apiUrl =
      reviewType === "food"
        ? `${API_BASE_URL}/food/${food_id}/reviews`
        : `${API_BASE_URL}/restaurant/${loggedInUser.restaurant_id}/reviews`;

    const fetchReviews = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.data) {
          setReviews(data.data); // Set the fetched reviews to state
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews(); // Fetch reviews when component is mounted
  }, [id]);

  console.log("reviewsss", reviews.length);

  return (
    <div
      className="bg-white shadow-md border bottom-slate-100  p-4 h-96 overflow-auto  "
      ref={ref}
    >
      <img
        className="cursor-pointer absolute right-10"
        src={assets.cross_icon}
        alt="cross_icon"
        onClick={closeModal}
      />
      <div className="grid grid-cols-1 divide-y">
        {reviews.length > 0 ? (
          reviews.map((review) => {
            return <Review review={review} key={review.id} />;
          })
        ) : (
          <div className="w-96">No reviews</div>
        )}
      </div>
    </div>
  );
});

export default SeeReviews;
