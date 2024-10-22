import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { FaUserCircle, FaUser, FaShoppingCart } from "react-icons/fa";

const Navbar = ({ setShowLogin }) => {
  const { getTotalQuantity } = useContext(StoreContext);
  const totalQuantity = getTotalQuantity();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleContectUs = () => {
    setOpenContactUs(!isContactUsOpen);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <Link
          to="/restaurants"
          onClick={() => setMenu("restaurants")}
          className={menu === "restaurants" ? "active" : ""}
        >
          Restaurants
        </Link>
        <Link
          to="/contact-us"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </Link>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search_icon" />
        <div className="navbar-basket-icon">
          <Link
            to="/cart"
            className={menu === "cart" ? "active" : ""}
            onClick={() => setMenu("")}
          >
            <FaShoppingCart className="text-3xl text-slate-600" />
          </Link>
          <div className={totalQuantity === 0 ? "dotHidden" : "dot"}>
            <p>{totalQuantity}</p>
          </div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign in</button>
        <div>
          <div className="relative inline-block text-left">
            <FaUserCircle
              className="text-5xl mt-1 pt-1 text-emerald-600 cursor-pointer text-slate-800"
              onClick={toggleDropdown}
            />

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute  mt-2 w-48 bg-white rounded-md shadow-lg z-10 shadow-slate-300">
                <Link
                  to="/user-profile"
                  onClick={() => {
                    setIsOpen(false), setMenu("");
                  }}
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  Profile
                </Link>
                <a
                  href="#"
                  onClick={() => {
                    setIsOpen(false), setMenu("");
                  }}
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
