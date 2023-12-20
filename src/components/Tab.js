import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Tab() {
  const [data, setData] = useState([]);
  const local = localStorage.getItem("token");
  const navigate = useNavigate();

  const getAllData = () => {
    axios
      .get("http://localhost:4006", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${local}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const deleteUser = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this data?");
  if (confirmDelete) {
    axios
      .delete(`http://localhost:4006/delete/${id}`)
      .then(() => {
        alert(" Your Data deleted Successfully");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
};

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      getAllData();
    }
  },[navigate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <div className="tab">
      <div>
        {local && (
          <>
            <Link to="/creatCrudForm">
              <button className="btn">Create Crud</button>
            </Link>
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
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
            data?.map((item) => 
            (
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
                  <button onClick={() => deleteUser(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tab;
