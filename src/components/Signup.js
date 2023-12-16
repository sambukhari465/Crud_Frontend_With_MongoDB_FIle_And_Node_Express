import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4006/signup", user)
      .then((res) => {
        console.log("res", res.data);
        if (res.data === "user already exist") {
          alert("User already exists. Please use a different email.");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/viewList");
    }
  }, [navigate]);

  return (
    <div className="bodyclass">
      <div className="mainclass" id="signupclss">
        <div className="leftclass">
          <h1>Company Name</h1>
          <h4>A company to fulfill Your Dreams.</h4>
        </div>
        <div className="rightclass">
          <h1>Sign up</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
            <label htmlFor="age">Age</label>
            <input
              type="text"
              id="age"
              name="age"
              value={user.age}
              onChange={handleChange}
            />
            <button type="submit">SignUp</button>
          </form>
          <p>
            Already have an account?{" "}
            <Link to="/">Sign In here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Signup;
