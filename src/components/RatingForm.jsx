import React, { useState, forwardRef } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Button from "./SmallComponents/Button/Button";
import { useAuth } from "./AuthProvider";

const RatingForm = forwardRef(({ onClose, reviewType }, modalRef) => {
  const { loggedInUser } = useAuth();
  const { id } = useParams();
  // State to handle ratings and review text
  const [ratings, setRatings] = useState({
    overall: 0,
    taste: 0,
    texture: 0,
    quality: 0,
    presentation: 0,
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
        className={`cursor-pointer text-2xl ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        onClick={() => handleRating(category, index + 1)}
      >
        <FaStar className="mr-1" />
      </span>
    ));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    const formData =
      reviewType === "food"
        ? {
            rating: ratings.overall,
            customer_id: loggedInUser.id,
            taste_rating: ratings.taste,
            texture_rating: ratings.texture,
            quality_rating: ratings.quality,
            presentation_rating: ratings.presentation,
            review_text: reviewText,
          }
        : {
            rating: ratings.overall,
            customer_id: loggedInUser.id,
            review_text: reviewText,
          };

    // Here you can send formData to an API or handle it as required
    console.log("Submitted Data: ", formData);

    const apiUrl =
      reviewType === "food"
        ? `http://localhost:5000/food/${id}/review`
        : `http://localhost:5000/restaurant/${loggedInUser.restaurant_id}/review`;

    try {
      // Make the POST request with fetch
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Review submitted successfully");
        setFormSubmitted(true); // Optionally, mark the form as submitted

        // Reset the form after submission
        setRatings({
          overall: 0,
          taste: 0,
          texture: 0,
          quality: 0,
          presentation: 0,
        });
        setReviewText(""); // Reset review text
        onClose();
      } else {
        console.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }

    setFormSubmitted(true); // Optionally, mark the form as

    // Optionally reset the form
    setRatings({
      overall: 0,
      taste: 0,
      texture: 0,
      quality: 0,
      presentation: 0,
    });
    setReviewText(""); // Reset review text after submission

    onClose();
  };

  return (
    <div className="p-6 w-96 bg-white rounded-2xl shadow-md" ref={modalRef}>
      <h2 className="text-2xl font-bold mb-4">Rate Your Experience</h2>

      <form onSubmit={handleSubmit}>
        {/* Overall Rating */}
        <div className="flex justify-center mb-4">
          {renderStars("overall", ratings.overall)}
        </div>
        {reviewType === "food" && (
          <div>
            <div className="mb-4 flex justify-between">
              <label className="block text-mg font-semibold">Taste</label>
              <div className="flex">{renderStars("taste", ratings.taste)}</div>
            </div>

            <div className="mb-4 flex justify-between">
              <label className="block text-lg font-semibold">Texture</label>
              <div className="flex">
                {renderStars("texture", ratings.texture)}
              </div>
            </div>

            <div className="mb-4 flex justify-between">
              <label className="block text-lg font-semibold">Quality</label>
              <div className="flex">
                {renderStars("quality", ratings.quality)}
              </div>
            </div>
            <div className="mb-4 flex justify-between">
              <label className="block text-lg font-semibold">
                Presentation
              </label>
              <div className="flex">
                {renderStars("presentation", ratings.presentation)}
              </div>
            </div>
          </div>
        )}

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
          <Button type="submit" children={`${"   "}Post${"   "}`} />
          <Button
            type="button"
            className="text-white bg-yellow-400 hover:bg-yellow-500"
            onClick={() => {
              // Reset form if cancel is clicked
              setRatings({
                overall: 0,
                taste: 0,
                texture: 0,
                presentation: 0,
                quality: 0,
              });
              setReviewText("");
              onClose(); // Clear review text
            }}
            children="Cancel"
          />
        </div>
      </form>

      {/* Optionally show a confirmation message */}
      {formSubmitted && (
        <div className="mt-4 text-green-500 font-semibold">
          Thank you for your {"   "} review!
        </div>
      )}
    </div>
  );
});

export default RatingForm;
