import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import RestaurantList from "./components/RestaurantList/RestaurantList";
import FoodCard from "./components/FoodProfile copy/FoodCard";
import RestaurantProfile from "./components/RestaurantProfile/RestaurantProfile";
import RestaurantPage from "./components/Restaurant copy/Restaurant";
import ContactUs from "./components/ContactUs";
import UserProfile from "./components/AdminPanelComponents/CustomerProfile";
import RatingForm from "./components/RatingForm";
import CenterModal from "./components/SmallComponents/CenterModal";
import HomeAdminPanel from "./components/AdminPanelComponents/HomeAdminPanel";

const App = () => {
  const [isContactUsOpen, setOpenContactUs] = useState(false);
  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/food/:id" element={<FoodCard />} />
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
          <Route path="/profile" element={<HomeAdminPanel />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
