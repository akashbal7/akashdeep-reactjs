import React, { useEffect, useState } from "react";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [food_list, setFoodList] = useState([]);
  const displayedFoodItems =
    category === "All" ? food_list.slice(0, 6) : food_list;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_BASE_URL}/foods`);
        if (!response.ok) {
          throw new Error("Failed to fetch foods");
        }
        const data = await response.json();
        setFoodList(data.foods); // Store foods array in context
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes Near You</h2>
      <div className="food-display-list">
        {displayedFoodItems.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={`data:image/png;base64,${item.image_data}`}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
