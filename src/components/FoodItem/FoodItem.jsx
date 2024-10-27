import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../SmallComponents/Button/Button";
import Rating from "../SmallComponents/Rating";
import FoodItemCounter from "../FoodItemCounter";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="food-item shadow-slate-300 shadow-lg">
      <div className="food-item-img-container">
        <img src={image} alt="image" className="food-item-img" />
        <FoodItemCounter
          id={id}
          cartItems={cartItems}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          assets={assets}
        />
      </div>
      <div className="food-item-info">
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
