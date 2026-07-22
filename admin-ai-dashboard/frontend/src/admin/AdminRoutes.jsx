import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Dashboard";

function AdminRoutes() {
  return (
    <ProtectedRoute>
      <Routes>
        <Route path="/*" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </ProtectedRoute>
  );
}

export default AdminRoutes;
