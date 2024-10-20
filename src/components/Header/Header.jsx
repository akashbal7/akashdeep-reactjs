import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="header-contents">
        <h2  className="text-blue-600">Order Your Favourite Food Here</h2>
        <p className="text-4xl">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <a href="#explore-menu">
          <button>View Menu</button>
        </a>
      </div>
    </header>
  );
};

export default Header;
