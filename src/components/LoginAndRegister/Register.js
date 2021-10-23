import React, { useState } from "react";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const registerUser = () => {
    if (!email || !password || !firstName || !lastName || !phone) {
      alert("All Fields are required");
      return;
    } else {
      fetch("https://neighbor-favor.herokuapp.com/post-user", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          firstname: firstName,
          lastname: lastName,
          phone: phone,
        }),
      })
        .then((response) => response.json())
        .then((text) => {
          alert(text);
          setEmail("");
          setPassword("");
          setFirstName("");
          setLastName("");
          setPhone("");
        });
      setTimeout(function () {
        window.location.reload();
        return false;
      }, 1000);
    }
  };

  return (
    <div className={"registration_container"}>
      <div className={"registration_form"}>
        <h1>Registration Form</h1>
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
        <input
          onChange={handleFirstName}
          type="text"
          placeholder="First Name..."
          value={firstName}
        />
        <input
          onChange={handleLastName}
          type="text"
          placeholder="Last Name..."
          value={lastName}
        />
        <input
          onChange={handlePhone}
          type="text"
          placeholder="Phone..."
          value={phone}
        />
        <p>*All fields are REQUIRED!!!</p>
        <button onClick={registerUser}>Register</button>
      </div>
    </div>
  );
}

export default Register;
