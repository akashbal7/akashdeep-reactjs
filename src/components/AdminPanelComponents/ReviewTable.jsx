import React, { useState, useEffect } from "react";
import { FaEye, FaTrash, FaPen } from "react-icons/fa";
import Tooltip from "./Tooltip";
import { useAuth } from "../AuthProvider";
import Rating from "../SmallComponents/Rating";

const ReviewTable = ({ reviewType }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [reviews, setReviews] = useState([]);
  const { loggedInUser } = useAuth();
  useEffect(() => {
    const apiUrl =
      reviewType === "food"
        ? `${API_BASE_URL}/restaurant/${loggedInUser.restaurant_id}/food/reviews`
        : `${API_BASE_URL}/restaurant/${loggedInUser.restaurant_id}/reviews`;

    const fetchReviews = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.data) {
          setReviews(data.data);
          console.log("rewiewssssssssssssssssss", data.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [loggedInUser.restaurant_id]);

  return (
    <table className="w-full table-auto bg-white shadow-lg">
      <thead>
        <tr className="bg-gray-300 text-left">
          <th className="p-4">
            {reviewType == "food" ? "Item Name" : "Review Id"}
          </th>
          <th>Review By</th>
          <th>Posted On</th>
          <th>Rating</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <tr className="border-b">
              <td className="p-3">
                {reviewType == "food" ? review.food_item.name : review.id}
              </td>
              <td>{review.customer.email}</td>
              <td>{review.created_at}</td>
              <td>
                <Rating rating={review.rating} />
              </td>
              <td className="flex gap-2 mt-4">
                <div className="relative group">
                  <FaEye className="cursor-pointer text-blue-400 text-lg" />
                  <Tooltip children="View" />
                </div>
              </td>
            </tr>
          ))
        ) : (
          <div>No reviews</div>
        )}
      </tbody>
    </table>
  );
};

export default ReviewTable;
