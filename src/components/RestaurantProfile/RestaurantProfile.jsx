import React, { useContext } from "react";
import "./RestaurantProfile.css";
import { StoreContext } from "../../context/StoreContext";
import Review from "../Review/Review";
import { useParams } from "react-router-dom";
import Button from "../SmallComponents/Button/Button";
import Rating from "../SmallComponents/Rating";
import { restaurantList } from "../../assets/assets";

const RestaurantProfile = () => {
  const { id } = useParams();
  const { restaurantList } = useContext(StoreContext);
  const res = restaurantList.find((res) => res._id === id);
  return (
    <div className="food-profile">
      {/* Main product section */}
      <div className="main-product">
        <div className="product-image-container">
          <img src={res.image} alt={res.name} className="main-product-image" />
        </div>
        <div className="product-details">
          <h6 className="text-4xl">{res.name}</h6>
          <Rating rating="3" />
          <p className="product-description">{res.description}</p>
          <Review reviewType="" />
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
