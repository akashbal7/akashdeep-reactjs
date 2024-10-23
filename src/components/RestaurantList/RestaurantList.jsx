import React, { useContext } from "react";
import "./RestaurantList.css";
import { StoreContext } from "../../context/StoreContext";
import Restaurant from "../Restaurant/Restaurant";

const RestaurantList = ({ category }) => {
  const { restaurantList } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h2>Restaurants</h2>
      <div className="grid  grid-cols-4 gap-4">
        {restaurantList.map((item, index) => {
          return (
            <Restaurant
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantList;
