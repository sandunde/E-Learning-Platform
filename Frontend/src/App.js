import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/register/Register";
import StudentDetails from "./pages/studentDetails/StudentDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/students" element={<StudentDetails />} />
        <Route path="/edit-profile" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
