import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    image: null,
  });
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
    axios
      .post("http://localhost:4006/create", formData)
      .then((res) => {
        console.log("res", res);
        if (res.data === "user already exist") {
          alert("User already exists. Please use a different email.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllData = () => {
    axios
      .get("http://localhost:4006")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:4006/delete/${id}`)
      .then(() => {
        alert("data deleted");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getAllData();
  }, [data]);
  return (
    <div >
      <div className="main">
      <div className="form">
            <div className="detail">
                <h1>CRUD OPERATION</h1>
                <form encType="multipart/form-data">
                    <label for="Name">
                        Full Name:</label>
                    <input  type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="Enter your name" />
                    <label for="Email">E-mail:</label>
                    <input type="text"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Enter your Email" />
                    <label for="Password">Password:</label>
                    <input  type="text"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Enter your password" />
                    <label for="Number">Age:</label>
                    <input type="text"
                    name="age"
                    value={user.age}
                    onChange={handleChange}
                    placeholder="Enter your age" />
                    <label for="File">File:</label>
                    <input type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setUser({ ...user, image: e.target.files[0] })} />
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
        </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Age</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.map((item) => {
              return (
                <>
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>{item.age}</td>
                    <td>{item.image}</td>
                    <td>
                      <Link
                        to="/update"
                        state={{
                          data1: {
                            id: item._id,
                            name: item.name,
                            email: item.email,
                            password: item.password,
                            age: item.age,
                            image: item.image,
                          },
                        }}
                      >
                      <button>Edit</button>
                        
                      </Link>

                      <button onClick={() => deleteUser(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default LoginForm;
