import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLogin from "./admin/AdminLogin";
import AdminRoutes from "./admin/AdminRoutes";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;