import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import LoginForm from "./components/LoginForm";
import Update from "./components/Update";
import Signin from "./components/Signin";
import Nav from "./components/Nav";
import Tab from "./components/Tab";
import Logout from "./components/Logout";

function App() {

  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Signin  />} />
          <Route path="/signup" element={<Signup  />} />
          <Route path="/loginform" element={<LoginForm  />} />
          <Route path="/update" element={<Update  />} />
          <Route path="/table" element={<Tab />} />
          <Route path="/logout" element={<Logout  />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
