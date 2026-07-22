import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    navigate("/admin/login", { replace: true });
  };

  return (
    <header className="navbar">
      <div>
        <h1>Admin Dashboard</h1>
        <p>Manage chatbot conversations and contact requests</p>
      </div>
      <button type="button" className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default Navbar;
