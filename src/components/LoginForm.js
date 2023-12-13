import React, { useEffect, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Logout from "./Logout";

function LoginForm() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    image: null,
  });

  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("age", user.age);
    formData.append("image", user.image);
    formData.append("auth", localStorage.getItem("token"))

    axios
      .post("http://localhost:4006/create", formData)
      .then((res) => {
        if (res.data === "user already exist") {
          alert("User already exists. Please use a different email.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [data,  navigate]);

  return (
      <div className="main">
        <div className="form">
          <div className="detail">
            <h1>CRUD OPERATION</h1>
            <form encType="multipart/form-data">
              <label htmlFor="Name">Full Name:</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              <label htmlFor="Email">E-mail:</label>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter your Email"
              />
              <label htmlFor="Password">Password:</label>
              <input
                type="text"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <label htmlFor="Number">Age:</label>
              <input
                type="text"
                name="age"
                value={user.age}
                onChange={handleChange}
                placeholder="Enter your age"
              />
              <label htmlFor="File">File:</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) =>
                  setUser({ ...user, image: e.target.files[0] })
                }
              />
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default LoginForm;
