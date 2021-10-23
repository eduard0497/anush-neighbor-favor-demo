import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginHandle = () => {
    if (!email || !password) {
      alert("All Fields are required");
      return;
    } else {
      fetch(
        `https://neighbor-favor.herokuapp.com/login?email=${email}&password=${password}`
      )
        .then((response) => response.json())
        .then((info) => {
          if (info.length) {
            sessionStorage.setItem("userid", info[0].userid);
          } else {
            alert("what ta hell...");
          }
          setEmail("");
          setPassword("");
        });
      setTimeout(function () {
        window.location.reload();
        return false;
      }, 1000);
    }
  };

  return (
    <div className="login_container">
      <div className="login_form">
        <h1>Login here</h1>
        <input
          onChange={handleEmail}
          type="email"
          placeholder="Email..."
          value={email}
        />
        <input
          onChange={handlePassword}
          type="password"
          placeholder="Password..."
          value={password}
        />
        <button onClick={loginHandle}>Login</button>
      </div>
    </div>
  );
}

export default Login;
