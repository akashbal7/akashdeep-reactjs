import React, { useContext } from "react";
import "./Restaurant.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../SmallComponents/Button/Button";
import Rating from "../SmallComponents/Rating";

const Restaurant = ({
  id,
  name,
  description,
  image,
  rating,
  total_reviews,
}) => {
  return (
    <div className="food-item shadow-slate-300 shadow-lg">
      <div className="food-item-img-container">
        <img src={image} alt="image" className="food-item-img" />
      </div>
      <div className="food-item-info">
        <div className="">
          <p>{name}</p>
        </div>
        <div className="text-sm text-gray-500 flex items-center">
          <span className="mr-2">
            <Rating rating={rating} />
          </span>{" "}
          {total_reviews} reviews
        </div>
        <p className="food-item-desc">{description}</p>
        <Link to={`/restaurant/${id}`} key={id}>
          <Button children="More details" />
        </Link>
      </div>
    </div>
  );
};

export default Restaurant;
