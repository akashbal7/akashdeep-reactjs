// LoginPopup.js
import React, { useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";

const LoginPopup = ({ setShowLogin }) => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <>
      {isRegister ? (
        <Register setShowLogin={setShowLogin} setShowRegister={setIsRegister} />
      ) : (
        <Login setShowLogin={setShowLogin} setShowRegister={setIsRegister} />
      )}
    </>
  );
};

export default LoginPopup;
