// LoginPopup.js
import React, { useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";

const LoginPopup = ({ setShowLogin }) => {
  const [isRegister, setIsRegister] = useState(false);

  {
    console.log("rendereeeeeeeeeeeeeeee");
    console.log("login", setShowLogin);
    console.log("register", isRegister);
  }
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
