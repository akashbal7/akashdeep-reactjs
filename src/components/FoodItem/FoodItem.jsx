import React, { useContext } from "react";
import "./FoodItem.css";
import { Link } from "react-router-dom";
import Button from "../SmallComponents/Button/Button";
import Rating from "../SmallComponents/Rating";
import QuantitySelector from "../SmallComponents/QuantitySelector";

const FoodItem = ({ id, name, price, description, image }) => {
  return (
    <div className="food-item shadow-slate-300 shadow-lg relative">
      <div className="food-item-img-container relative">
        <img
          src={image}
          alt="image"
          className="food-item-img transition duration-300 ease-in-out hover:blur-sm"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
          <QuantitySelector foodItemId={id} colorCart="text-white" />
        </div>
      </div>
      <div className="food-item-info p-4">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <Rating rating={4} />
          <p className="food-item-price">${price}</p>
        </div>
        <p className="food-item-desc">{description}</p>
        <Link to={`/food/${id}`} key={id}>
          <Button children="More details" />
        </Link>
      </div>
    </div>
  );
};

export default FoodItem;
