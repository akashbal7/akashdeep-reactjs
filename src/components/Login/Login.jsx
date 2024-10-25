// Login.js
import React, { useState } from "react";
import { assets } from "../../assets/assets";
import Button from "../SmallComponents/Button/Button";

const Login = ({ setShowLogin, setShowRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("ffffffffffffffffffffffffffffffffffffff");

    const existingUsers = JSON.parse(sessionStorage.getItem("users")) || [];
    console.log(existingUsers);
    const user = existingUsers.find((user) => user.email === email);
    console.log(user);
    if (!user) {
      setError("Email not registered.");
      return; // Exit if user not found
    }

    if (user.password !== password) {
      setError("Incorrect password. Please try again.");
      return; // Exit if password doesn't match
    }

    // Create a new user object
    const createLogin = {
      id: Date.now(), // Using a timestamp as a unique ID
      email: email,
      password: password,
      isLogedIn: true,
    };

    // Add new user to the array

    // Save updated users array back to local storage
    sessionStorage.setItem("loginUsers", JSON.stringify(createLogin));
    setEmail("");
    setPassword("");
    setError(""); //
    // Optionally, clear form fields or show success message
    alert("Login successfully!");

    // Hide register form and possibly show login form
    setShowRegister(false);
    setShowLogin(false);
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
