import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload.jsx/AppDownload";
import RestaurantList from "../../components/RestaurantList/RestaurantList";
import FoodProfile from "../../components/FoodProfile/FoodProfile";
import UserProfile from "../components/UserProfile";
import RestaurantProfile from "../components/RestaurantProfile";

const Profile = () => {
  const [category, setCategory] = useState("All");

  const loggedInUser = JSON.parse(sessionStorage.getItem("loginUsers"));

  return (
    <div>
      <UserProfile />
      <RestaurantProfile />
    </div>
  );
};

export default Profile;
