import React, { useContext } from "react";
import "./FoodProfile.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import Review from "../Review/Review";
import { useParams } from 'react-router-dom';
import Button from "../SmallComponents/Button/Button";
import Rating from "../SmallComponents/Rating";

const FoodProfile = () => {
  const { id } = useParams();
  const { food_list } = useContext(StoreContext);
  const product = food_list.find(product => product._id === id);
  return (
    <div className="food-profile">
      {/* Main product section */}
      <div className="main-product">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.name}
            className="main-product-image"
          />
        </div>
        <div className="product-details">
          <h6 className="text-4xl">{product.name}</h6>
          <p className="price">${product.price}</p>
          <p className="stock-status">IN STOCK</p>
          <Button children="Add to cart"/>
          <Rating rating="3"/>
          <p className="product-description">{product.description}</p>
          <Review/>
        </div>
      </div>
      
    </div>
  );
};

export default FoodProfile;

