// Register.js
import React, { useState } from "react";
import { assets } from "../../assets/assets";
import Button from "../SmallComponents/Button/Button";

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
    <div>
      <form
        className="w-96 bg-white text-gray-500 flex flex-col gap-6 p-6 rounded-2xl"
        onSubmit={handleFormSubmit}
      >
        <div className="flex justify-between items-center text-gray-800">
          <h2 className="text-lg font-semibold">Sign Up</h2>
          <img
            src={assets.cross_icon}
            alt="cross_icon"
            className="w-4 cursor-pointer"
            onClick={() => {
              setShowRegister(false), setShowLogin(false);
            }}
          />
        </div>

        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="First Name"
            required
            defaultValue={firstName}
            onBlur={(e) => setFirstName(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="text"
            placeholder="Last Name"
            required
            defaultValue={lastName}
            onBlur={(e) => setLastName(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="email"
            placeholder="Your email"
            required
            defaultValue={email}
            onBlur={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="password"
            placeholder="Password"
            required
            defaultValue={password}
            onBlur={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            defaultValue={confirmPassword}
            onBlur={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="tel"
            placeholder="Phone Number (optional)"
            defaultValue={phoneNumber}
            onBlur={(e) => setPhoneNumber(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />

          <div className="flex gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="customer"
                checked={role === "customer"}
                onChange={() => setRole("customer")}
                className="focus:ring-blue-300"
              />
              <span>Customer</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="restaurant_owner"
                checked={role === "restaurant_owner"}
                onChange={() => setRole("restaurant_owner")}
                className="focus:ring-blue-300"
              />
              <span>Restaurant Owner</span>
            </label>
          </div>
        </div>

        <Button type="submit" children="Create Account" />

        <p className="text-sm">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer"
            onClick={() => {
              setShowRegister(false);
            }}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
