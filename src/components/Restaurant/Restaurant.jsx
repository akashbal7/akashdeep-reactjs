import React, { useContext } from "react";
import "./Restaurant.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const Restaurant = ({ id, name, price, description, image }) => {
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={image} alt="image" className="food-item-img" />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating_starts" />
        </div>
        <p className="food-item-desc">{description}</p>
        
        <button class="moredetail-button">More Detail</button>
      </div>
    </div>
  );
};

export default Restaurant;
