import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaUser, FaShoppingCart } from "react-icons/fa";

const Navbar = ({ setShowLogin }) => {
  const { getTotalQuantity } = useContext(StoreContext);
  const totalQuantity = getTotalQuantity();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleContectUs = () => {
    setOpenContactUs(!isContactUsOpen);
  };

  const logoutHandle = () => {
    // Clear the logged-in users from sessionStorage
    sessionStorage.removeItem("loginUsers");

    // Optionally, reset any application state or perform additional logout logic here
    // e.g., redirect to home or show a notification

    // Close the dropdown menu after logout
    setIsOpen(false);
    setMenu(""); // Reset menu state if needed
    alert("You have been logged out."); // Notify the user (optional)
    navigate("/");
  };

  const loggedInUser = JSON.parse(sessionStorage.getItem("loginUsers"));
  console.log("loggedInuser", loggedInUser);
  return (
    <div className="navbar">
      <Link to="/">
        {/* <img src={assets.logo_set2go} alt="logo" className="logo" /> */}
        <span className="text-emerald-400 text-2xl font-bold">SET</span>
        <span className="text-orange-400 text-4xl font-extrabold">2</span>
        <span className="text-emerald-400 text-2xl font-bold">GO</span>
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
        {!loggedInUser ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div>
            <div className="relative inline-block text-left">
              <FaUser
                className="text-3xl text-gray-500 mt-1 pt-1 text-emerald-600 cursor-pointer text-slate-800"
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
                      setIsOpen(false), setMenu(""), logoutHandle();
                    }}
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
