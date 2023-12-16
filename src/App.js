import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import LoginForm from "./components/LoginForm";
import Update from "./components/Update";
import Signin from "./components/Signin";
import Tab from "./components/Tab";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signin  />} />
          <Route path="/signup" element={<Signup  />} />
          <Route path="/creatCrudForm" element={<LoginForm  />} />
          <Route path="/update" element={<Update  />} />
          <Route path="/viewList" element={<Tab />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
