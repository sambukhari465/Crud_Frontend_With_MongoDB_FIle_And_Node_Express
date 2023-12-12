import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import LoginForm from "./components/LoginForm";
import Update from "./components/Update";
import Signin from "./components/Signin";

function App() {
  const [userData, setUserData] = useState(null);

  const handleUserData = (data) => {
    setUserData(data);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin onUserData={handleUserData} />} />
          <Route path="/signup" element={<Signup onUserData={handleUserData} />} />
          <Route path="/loginform" element={<LoginForm userData={userData} />} />
          <Route path="/update" element={<Update userData={userData} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
