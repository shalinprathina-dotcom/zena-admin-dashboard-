import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import DashboardHome from "./DashboardHome";
import ContactRequests from "./ContactRequests";
import ChatHistory from "./ChatHistory";
import "./admin.css";

function Dashboard() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Navbar />
        <div className="dashboard-body">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="contact-requests" element={<ContactRequests />} />
            <Route path="chat-history" element={<ChatHistory />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
