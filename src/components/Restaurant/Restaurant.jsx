import React, { useContext } from "react";
import "./Restaurant.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../SmallComponents/Button/Button";
import Rating from "../SmallComponents/Rating";

const Restaurant = ({ id, name, description, image }) => {
  return (
    <div className="food-item shadow-slate-300 shadow-lg">
      <div className="food-item-img-container">
        <img src={image} alt="image" className="food-item-img" />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
        </div>
        <Rating rating={3} />
        <p className="food-item-desc">{description}</p>
        <Link to={`/restaurant/${id}`} key={id}>
          <Button children="More details" />
        </Link>
      </div>
    </div>
  );
};

export default Restaurant;
