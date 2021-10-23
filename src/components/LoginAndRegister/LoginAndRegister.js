import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./LoginAndRegister.css";

function LoginAndRegister() {
  const [showLoginPage, setShowLoginPage] = useState(true);

  const toggleLoginOrRegisterPage = () => {
    setShowLoginPage(!showLoginPage);
  };

  return (
    <div>
      <div className="login_and_register_toggle_container">
        <button onClick={toggleLoginOrRegisterPage}>
          Toggle Login/Register Pages
        </button>
      </div>
      <div>{showLoginPage ? <Login /> : <Register />}</div>
    </div>
  );
}

export default LoginAndRegister;
