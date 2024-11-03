// Register.js
import React, { useState } from "react";
import { assets } from "../../assets/assets";
import Button from "../SmallComponents/Button/Button";
import ToggleButton from "../SmallComponents/ToggleButton";

const Register = ({ setShowLogin, setShowRegister }) => {
  const [role, setRole] = useState("customer");

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // To handle API errors

  const handleToggleChange = () => {
    setIsToggleEnabled((prevState) => !prevState);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Ensure password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Hash the password (assuming you have a hashPassword function)
    // const hashedPassword = await hashPassword(password);

    // Create a new user object
    const newUser = {
      email,
      password, // Use the hashed password
      first_name: firstName, // Use snake_case for API compatibility
      last_name: lastName,
      role: isToggleEnabled ? "owner" : "customer",
      restaurant_name: restaurantName,
    };

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        // Handle error response
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Registration failed.");
        return;
      }

      const result = await response.json();

      // Hide register form and show login form
      setShowRegister(false);
      setShowLogin(true);
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage(
        "An error occurred during registration. Please try again."
      );
    }
  };

  return (
    <div>
      {errorMessage && <div className="text-red-600">{errorMessage}</div>}
      <form
        className="w-96 bg-white text-gray-500 flex flex-col gap-2 p-6 rounded-2xl"
        onSubmit={handleFormSubmit}
      >
        <div className="flex justify-between items-center text-gray-800">
          <h2 className="text-lg font-semibold">Sign Up</h2>
          <img
            src={assets.cross_icon}
            alt="cross_icon"
            className="w-4 cursor-pointer"
            onClick={() => {
              setShowRegister(false);
              setShowLogin(false);
            }}
          />
        </div>

        <div className="flex flex-col gap-4">
          <ToggleButton
            isEnabled={isToggleEnabled}
            handleToggleChange={handleToggleChange}
            children="Restaurant Owner?"
          />
          {isToggleEnabled && (
            <input
              type="text"
              placeholder="Restaurant Name"
              value={restaurantName}
              required
              onChange={(e) => setRestaurantName(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          )}
          <input
            type="text"
            placeholder="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="text"
            placeholder="Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="email"
            placeholder="Your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
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
