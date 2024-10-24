import React, { useState } from "react";
import Rating from "./SmallComponents/Rating";

// Review card component
const Review = ({ review }) => {
  console.log("review", review);
  const [isMoreReviewOpen, setIsMoreReviewOpen] = useState(false);
  const handleMoreReview = () => {
    setIsMoreReviewOpen(true);
  };
  return (
    <div className="">
      <div className="flex items-center mb-1  ">
        <div>
          <h3 className="font-semibold text-lg mt-2">{review.name}</h3>
          <p className="text-gray-500 text-sm">{review.role}</p>
        </div>
      </div>

      {/* Star rating */}
      <div className="flex items-center mb-2">
        <Rating rating={3} />
        <p className="ml-2 text-gray-500 text-sm">{review.date}</p>
      </div>

      {/* Review text */}
      <p className="text-gray-700 mb-4">{review.text}</p>
    </div>
  );
};

export default Review;
