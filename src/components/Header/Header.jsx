import React from "react";
import "./Header.css";
import Button from "../SmallComponents/Button/Button";
import { Link } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";

const Header = () => {
  return (
    <header>
      <div className="header-contents">
        <h2>Order Your Favourite Food Here!! Self service</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <Link to={`/menu`}>
          <button
            type="button"
            className="rounded-3xl mt-6 text-sm px-5 py-2.5 text-gray-900 bg-white focus:outline-none"
          >
            <span className="flex">
              <FaUtensils className="mr-1 mt-1 pb-1" /> <span>View Menu</span>
            </span>
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
