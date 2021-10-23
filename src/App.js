import "./App.css";
import React, { useState, useEffect } from "react";
import LoginAndRegister from "./components/LoginAndRegister/LoginAndRegister";
import HomePage from "./components/HomePage/HomePage";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.length) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, []);

  return (
    <div className="app">
      {userLoggedIn ? <HomePage /> : <LoginAndRegister />}
    </div>
  );
}

export default App;
