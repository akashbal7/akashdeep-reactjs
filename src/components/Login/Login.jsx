// Login.js
import React, { useState } from "react";
import "./Login.css";
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
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleFormSubmit}>
        <div className="login-popup-title">
          <h2>Login</h2>
          <img
            src={assets.cross_icon}
            alt="cross_icon"
            onClick={() => setShowLogin(false)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="login-popup-inputs">
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
        </div>

        <Button type="submit" children="Login" />

        <p>
          Create a new account?{" "}
          <span onClick={() => setShowRegister(true)}>Click here</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
