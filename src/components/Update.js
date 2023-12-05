import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function Update() {
  const location = useLocation();
  const { data1 } = location.state;
  const navigate = useNavigate();
  const [updateUser, setUpdateUser] = useState({
    id: data1.id,
    name: data1.name,
    email: data1.email,
    password: data1.password,
    age: data1.age,
    image: data1.image,
  });
  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4006/update/${updateUser.id}`, updateUser)
      .then((res) => {
        console.log("res", res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="main">
      <div className="form">
        <div className="detail">
          <h1>Update CRUD Form</h1>
          <form encType="multipart/form-data">
            <label for="Name">Full Name:</label>
            <input
              type="text"
              name="name"
              value={updateUser.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            <label for="Email">E-mail:</label>
            <input
              type="text"
              name="email"
              value={updateUser.email}
              onChange={handleChange}
              placeholder="Enter your Email"
            />
            <label for="Password">Password:</label>
            <input
              type="text"
              name="password"
              value={updateUser.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <label for="Number">Age:</label>
            <input
              type="text"
              name="age"
              value={updateUser.age}
              onChange={handleChange}
              placeholder="Enter your age"
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

export default Update;
