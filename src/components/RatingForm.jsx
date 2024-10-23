import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const RatingForm = ({ onClose }) => {
  // State to handle ratings and review text
  const [ratings, setRatings] = useState({
    overall: 0,
    food: 0,
    service: 0,
    atmosphere: 0,
  });

  const [reviewText, setReviewText] = useState(""); // Add this to track the text area input
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle changes to ratings
  const handleRating = (category, value) => {
    setRatings((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  // Render the star rating based on the category and rating
  const renderStars = (category, rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`cursor-pointer text-3xl ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        onClick={() => handleRating(category, index + 1)}
      >
        <FaStar className="mr-1" />
      </span>
    ));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    const formData = {
      overallRating: ratings.overall,
      foodRating: ratings.food,
      serviceRating: ratings.service,
      atmosphereRating: ratings.atmosphere,
      reviewText: reviewText,
    };

    // Here you can send formData to an API or handle it as required
    console.log("Submitted Data: ", formData);
    setFormSubmitted(true); // Optionally, mark the form as submitted

    // Optionally reset the form
    setRatings({ overall: 0, food: 0, service: 0, atmosphere: 0 });
    setReviewText(""); // Reset review text after submission

    onClose();
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Rate Your Experience</h2>

      <form onSubmit={handleSubmit}>
        {/* Overall Rating */}
        <div className="flex justify-center mb-4">
          {renderStars("overall", ratings.overall)}
        </div>

        {/* Food Rating */}
        <div className="mb-4 flex justify-between">
          <label className="block text-lg font-semibold">Food</label>
          <div className="flex">{renderStars("food", ratings.food)}</div>
        </div>

        {/* Service Rating */}
        <div className="mb-4 flex justify-between">
          <label className="block text-lg font-semibold">Service</label>
          <div className="flex">{renderStars("service", ratings.service)}</div>
        </div>

        {/* Atmosphere Rating */}
        <div className="mb-4 flex justify-between">
          <label className="block text-lg font-semibold">Atmosphere</label>
          <div className="flex">
            {renderStars("atmosphere", ratings.atmosphere)}
          </div>
        </div>

        {/* Review Text Area */}
        <div className="mb-4">
          <textarea
            className="w-full p-3 border rounded-lg resize-none"
            placeholder="Share details of your own experience at this place"
            rows="4"
            value={reviewText} // Controlled input
            onChange={(e) => setReviewText(e.target.value)} // Update review text
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-gray-300 text-gray-600 py-2 px-4 rounded-md"
            onClick={() => {
              // Reset form if cancel is clicked
              setRatings({ overall: 0, food: 0, service: 0, atmosphere: 0 });
              setReviewText("");
              onClose(); // Clear review text
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Post
          </button>
        </div>
      </form>

      {/* Optionally show a confirmation message */}
      {formSubmitted && (
        <div className="mt-4 text-green-500 font-semibold">
          Thank you for your review!
        </div>
      )}
    </div>
  );
};

export default RatingForm;
