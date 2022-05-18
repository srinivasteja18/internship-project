import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import CreateAppointment from "./createAppointment";
import MyAppointments from "./myAppointments";
import UpdateAppointment from "./updateAppointment";
import Home from "./Home";
import "./App.css";

export default function Rootes() {
  return (
    <Router>
      <ToastContainer theme="dark" />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route
          exact
          path="/appointment/create"
          element={<CreateAppointment />}
        />
        <Route exact path="/appointments" element={<MyAppointments />} />
        <Route
          exact
          path="/appointment/update/:appointmentId"
          element={<UpdateAppointment />}
        />
      </Routes>
    </Router>
  );
}
