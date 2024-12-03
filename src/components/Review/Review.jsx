import React, { useState } from "react";
import "./Review.css";

const Review = (reviewType) => {
  const [rating, setRating] = useState(0);
  const [opinion, setOpinion] = useState("");

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Rating:", rating, "Opinion:", opinion);
    // Handle the submit logic here
  };

  const handleCancel = () => {
    setRating(0);
    setOpinion("");
  };

  return (
    <div className="wrapper">
      <h3>Lorem ipsum dolor sit amet.</h3>
      <form onSubmit={handleSubmit}>
        <div className="rating">
          <input type="number" name="rating" value={rating} hidden readOnly />
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={`bx ${i < rating ? "bxs-star" : "bx-star"} star`}
              onClick={() => handleStarClick(i)}
              style={{ "--i": i }}
            />
          ))}
        </div>
        <textarea
          name="opinion"
          cols="30"
          rows="5"
          placeholder="Your opinion..."
          value={opinion}
          onChange={(e) => setOpinion(e.target.value)}
        />
        <div className="btn-group">
          <button type="submit" className="btn submit">
            Submit
          </button>
          <button type="button" className="btn cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Review;
