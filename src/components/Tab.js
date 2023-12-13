import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Tab() { 
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
          alert("Data deleted");
        })
        .catch((err) => {
          console.log("err", err);
        });
    };
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
      }
      getAllData();
      if (location.state && location.state.data1) {
        setUser(location.state.data1);
      }
    }, [data, location.state, navigate]);
  
   
    return (
        <div>
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
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.password}</td>
                      <td>{item.age}</td>
                      <td>{item.image}</td> {/* This part may need adjustment */}
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
                        <button onClick={() => deleteUser(item._id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      );
      
}

export default Tab
