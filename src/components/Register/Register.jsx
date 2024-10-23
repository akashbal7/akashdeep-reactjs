// Register.js
import React, { useState } from "react";
import "./Register.css";
import { assets } from "../../assets/assets";

const Register = ({ setShowLogin, setShowRegister }) => {
  const [role, setRole] = useState("customer");

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Ensure password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Create a new user object
    const newUser = {
      id: Date.now(), // Using a timestamp as a unique ID
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      password,
      profileUrl: `https://example.com/profiles/${firstName}_${lastName}`,
    };

    // Retrieve existing users from local storage
    const existingUsers = JSON.parse(sessionStorage.getItem("users")) || [];

    // Add new user to the array
    existingUsers.push(newUser);

    // Save updated users array back to local storage
    sessionStorage.setItem("users", JSON.stringify(existingUsers));

    // Optionally, clear form fields or show success message
    alert("Account created successfully!");

    // Hide register form and possibly show login form
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleFormSubmit}>
        <div className="login-popup-title">
          <h2>Sign Up</h2>
          <img
            src={assets.cross_icon}
            alt="cross_icon"
            onClick={() => setShowRegister(false)}
          />
        </div>
        <div className="login-popup-inputs">
          <input
            type="text"
            placeholder="First Name"
            required
            defaultValue={firstName}
            onBlur={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            required
            defaultValue={lastName}
            onBlur={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your email"
            required
            defaultValue={email}
            onBlur={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            defaultValue={password}
            onBlur={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            defaultValue={confirmPassword}
            onBlur={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number (optional)"
            defaultValue={phoneNumber}
            onBlur={(e) => setPhoneNumber(e.target.value)}
          />

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

        <button
          type="submit"
          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        >
          Create Account
        </button>

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
