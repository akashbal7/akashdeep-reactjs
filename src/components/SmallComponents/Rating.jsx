import React from "react";
import { FaStar } from "react-icons/fa";

const Rating = ({ rating, className }) => {
  // Generate an array with 5 elements to render the stars
  const totalStars = 5;

  return (
    <div className="flex items-center">
      {Array.from({ length: totalStars }, (v, i) => (
        <span
          key={i}
          className={`${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        >
          <FaStar className={className} />
        </span>
      ))}
    </div>
  );
};

export default Rating;
