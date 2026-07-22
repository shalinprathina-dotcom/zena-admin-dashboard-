import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("admin_logged_in", "true");
      navigate("/admin", { replace: true });
      return;
    }

    setError("Invalid credentials. Use admin / admin123.");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>ZeNA Admin Dashboard</h1>
        <p>HR/Admin access only</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter admin username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter admin password"
            required
          />

          {error ? <p className="error-text">{error}</p> : null}

          <button type="submit" className="primary-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
