import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../SmallComponents/Button/Button";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);


  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={image} alt="image" className="food-item-img" />
        {!cartItems[id] ? (
          <img
            src={assets.add_icon_white}
            alt="add_icon_white"
            className="add"
            onClick={(e) => 
              {
                e.stopPropagation
                addToCart(id)
              }
              }
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              alt="remove_icon_red"
              onClick={(e) => {e.stopPropagation, removeFromCart(id)}}
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              alt="add_icon_green"
              onClick={(e) => {e.stopPropagation, addToCart(id)}}
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating_starts" />
          <p className="food-item-price">${price}</p>
        </div>
        <p className="food-item-desc">{description}</p>
          <Link to={`/food/${id}`} key={id}>
          <Button children="More details"/>
          </Link >
          </div>
    </div>
  );
};

export default FoodItem;
