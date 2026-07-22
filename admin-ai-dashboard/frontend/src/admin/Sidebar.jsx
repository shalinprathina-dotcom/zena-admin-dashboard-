import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>ZeNA Admin</h2>
      <nav>
        <NavLink to="/admin" end className="nav-link">
          Dashboard Home
        </NavLink>
        <NavLink to="/admin/contact-requests" className="nav-link">
          Contact Requests
        </NavLink>
        <NavLink to="/admin/chat-history" className="nav-link">
          Chat History
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
