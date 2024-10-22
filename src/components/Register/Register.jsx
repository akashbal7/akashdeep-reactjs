// Register.js
import React, { useState } from "react";
import "./Register.css";
import { assets } from "../../assets/assets";

const Register = ({ setShowLogin, setShowRegister }) => {
  const [role, setRole] = useState("customer");

  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>Sign Up</h2>
          <img
            src={assets.cross_icon}
            alt="cross_icon"
            onClick={() => setShowRegister(false)}
          />
        </div>
        <div className="login-popup-inputs">
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
          <input type="email" placeholder="Your email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <input type="tel" placeholder="Phone Number (optional)" />

          <div className="role-toggle">
            <label className="customer-lable">
              <input
                type="radio"
                value="customer"
                checked={role === "customer"}
                onChange={() => setRole("customer")}
              />
              Customer
            </label>
            <label>
              <input
                type="radio"
                value="restaurant_owner"
                checked={role === "restaurant_owner"}
                onChange={() => setRole("restaurant_owner")}
              />
              Restaurant Owner
            </label>
          </div>
        </div>

        <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Create Account</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>

        <p>
          Already have an account?{" "}
          <span onClick={() => setShowLogin(true)}>Login here</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
