// Login.js
import React from "react";
import "./Login.css";
import { assets } from "../../assets/assets";

const Login = ({ setShowLogin, setShowRegister }) => {
  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>Login</h2>
          <img
            src={assets.cross_icon}
            alt="cross_icon"
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-popup-inputs">
          <input type="email" placeholder="Your email" required />
          <input type="password" placeholder="Password" required />
        </div>

        <button>Login</button>

        <p>
          Create a new account?{" "}
          <span onClick={() => setShowRegister(true)}>Click here</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
