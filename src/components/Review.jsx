import React, { useState } from "react";
import Rating from "./SmallComponents/Rating";

// Review card component
const Review = ({ review }) => {
  console.log("review", review);
  const [isMoreReviewOpen, setIsMoreReviewOpen] = useState(false);
  const handleMoreReview = () => {
    setIsMoreReviewOpen(true);

    console.log("review", review);
  };
  return (
    <div className="w-96">
      <div className="flex items-center mb-1  ">
        <div>
          <h3 className="font-semibold text-lg mt-2">
            {review.customer.full_name}
          </h3>
          <p className="text-gray-500 text-sm">{review.role}</p>
        </div>
      </div>

      {/* Star rating */}
      <div className="flex items-center mb-2">
        <Rating rating={review.rating} />
        <p className="ml-2 text-gray-500 text-sm">{review.created_at}</p>
      </div>

      {/* Review text */}
      <p className="text-gray-700 mb-4">{review.review_text}</p>
    </div>
  );
};

export default Review;
