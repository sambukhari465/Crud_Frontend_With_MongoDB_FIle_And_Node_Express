import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <button
        onClick={logout}
        style={{
          display: "block",
          margin: "auto",
          backgroundColor: "#f16353",
          padding: "15px",
          border: "none",
          borderRadius: "20px",
          color: "white",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
