// Login.js
import React, { useState } from "react";
import { assets } from "../../assets/assets";
import Button from "../SmallComponents/Button/Button";
import { useAuth } from "../AuthProvider";

const Login = ({ setShowLogin, setShowRegister }) => {
  const [email, setEmail] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loginUser } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload
    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error); // Set the error message from the response
        return; // Exit if the response is not OK
      }

      const data = await response.json();
      // Here you can save the user data or role to session storage or state
      const createLogin = {
        id: data.data.id, // Using a timestamp as a unique ID
        email: email,
        isLogedIn: true,
        first_name: data.data.first_name,
        last_name: data.data.last_name,
        full_name: data.data.full_name,
        role: data.data.role,
        status: data.data.status,
        token: data.data.token,
        restaurant_id: data.data.restaurant_id,
      };

      // Assume response contains user data after login
      loginUser(createLogin);

      // Save logged-in user to session storage

      // Clear form fields and error message
      setEmail("");
      setPassword("");
      setError("");

      // Hide register form and login form
      setShowRegister(false);
      setShowLogin(false);
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="">
      <form
        className="bg-white text-gray-500 flex flex-col gap-6 p-6 w-96 rounded-2xl"
        onSubmit={handleFormSubmit}
      >
        <div className="flex justify-between items-center text-gray-800">
          <h2 className="text-lg font-semibold">Login</h2>
          <img
            src={assets.cross_icon}
            alt="cross_icon"
            className="w-4 cursor-pointer"
            onClick={() => setShowLogin(false)}
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-col gap-5">
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
        </div>
        <Button type="submit" children="Login" />

        <p className="text-sm">
          Create a new account?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer"
            onClick={() => setShowRegister(true)}
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
