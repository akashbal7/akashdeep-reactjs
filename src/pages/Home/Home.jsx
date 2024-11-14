import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload.jsx/AppDownload";
import RestaurantList from "../../components/RestaurantList/RestaurantList";
import FoodProfile from "../../components/FoodProfile/FoodProfile";

const Home = () => {
  const [category, setCategory] = useState("All");
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/restaurants");
        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }
        const data = await response.json();
        setRestaurants(data.data); // Store foods array in context
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <RestaurantList restaurants={restaurants} />
    </div>
  );
};

export default Home;
