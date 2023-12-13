  import React, { useState, useEffect } from "react";
  import { useNavigate, Link } from "react-router-dom";
  import axios from "axios";

  function Signin() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
      email: "",
      password: "",
    });

    const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };

  

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/loginform");
      }
    }, [navigate]);

    const handleSubmit = (e) => {
      e.preventDefault();
      axios
        .post("http://localhost:4006/signin", user)
        .then((res) => {
          if (res.data === "user not found") {
            alert("User not found. Please enter the correct email.");
          } else {
            localStorage.setItem("token", res.data.token);
            navigate("/loginform");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <div className="bodyclass">
        <div className="mainclass">
          <div className="leftclass">
            <h1>Company Name</h1>
          </div>
          <div className="rightclass">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
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
              <button type="submit">Sign In</button>
            </form>
            <p>
              Already have an account? <Link to="/signup">Sign Up here</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  export default Signin;
