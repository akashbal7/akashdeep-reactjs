import React, { useState } from "react";
import Review from "./Review";
import { assets } from "../assets/assets";
import Button from "./SmallComponents/Button/Button";

// Review card component
const SeeReviews = ({ onClose }) => {
  const closeModal = () => {
    onClose();
  };
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
  return (
    <div className="bg-white shadow-md border bottom-slate-100  p-4 h-96 overflow-auto ">
      <img
        className="cursor-pointer absolute right-10"
        src={assets.cross_icon}
        alt="cross_icon"
        onClick={closeModal}
      />
      <div className="grid grid-cols-1 divide-y">
        {reviewList.map((review) => {
          return <Review review={review} key={review.id} />;
        })}
      </div>
    </div>
  );
};

export default SeeReviews;
