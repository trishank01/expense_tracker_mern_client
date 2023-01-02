import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";

const RoutesList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exect path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesList;
