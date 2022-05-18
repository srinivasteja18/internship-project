import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Base from "./core/Base";
import { createAppointment } from "./ApiCalls/helper";
import animationData from "./anims/create.json";
import Lottie from "react-lottie";

const AddAppointment = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    mobile: "",
    doctor: "x",
    doctors: ["x", "y", "z"],
    date: "",
    time: "",
    loading: false,
    error: "",
    createdAppointment: "",
    getRedirect: false,
  });
  const { name, mobile, date, doctors, getRedirect, time } = values;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setValues({ ...values, error: false, getRedirect: false, [field]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, getRedirect: false });
    createAppointment(values).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
        toast("Appointment Added Failed", { type: "error" });
      } else {
        setValues({
          ...values,
          name: "",
          mobile: "",
          doctor: "",
          date: "",
          time: "",
          createdAppointment: data.name,
          photo: "",
          getRedirect: true,
        });
      }
    });
  };

  const redirectUser = () => {
    if (getRedirect) {
      toast("Appointment created Succesfully", { type: "success" });
      setTimeout(() => navigate("/"), 4000);
    }
  };

  const AppointmentForm = () => {
    return (
      <div className="Application-container" style={{ textAlign: "center" }}>
        <form className="Appointment-card">
          <div className="Appointment-helper">
            <label className="Appointment-labels">Name: </label>
            <input
              className="Appointment-inputs"
              placeholder="Patient Name"
              value={name}
              type="text"
              onChange={handleChange("name")}
            />
          </div>
          <div className="Appointment-helper">
            <label className="Appointment-labels">Mobile: </label>
            <input
              type="number"
              className="Appointment-inputs"
              value={mobile}
              placeholder="Mobile Number"
              onChange={handleChange("mobile")}
            ></input>
          </div>
          <div className="Appointment-helper">
            <label className="Appointment-labels">Doctor: </label>
            <select
              onChange={handleChange("doctor")}
              className="Appointment-inputs"
            >
              <option>Select Doctor</option>
              {doctors &&
                doctors.map((doctor, index) => (
                  <option key={index} value={doctor}>
                    {doctor}
                  </option>
                ))}
            </select>
          </div>
          <div className="Appointment-helper">
            <label className="Appointment-labels">Date: </label>
            <input
              type="date"
              className="Appointment-inputs"
              placeholder="date"
              value={date}
              onChange={handleChange("date")}
            />
          </div>
          <div className="Appointment-helper">
            <label className="Appointment-labels">Time: </label>
            <input
              type="time"
              placeholder="time"
              className="Appointment-inputs"
              value={time}
              onChange={handleChange("time")}
            />
          </div>
          <button onClick={onSubmit} className="Appointment-button">
            Create Appointment
          </button>
        </form>
        <div className="home-div">
          <Link className="link-button" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    );
  };

  return (
    <Base title="" description="">
      <div className="middle-section">
        {redirectUser()}
        <div className="create-container">
          <div>
            <h1 style={{ marginLeft: "1rem" }}>Create Appointment</h1>
            {AppointmentForm()}
          </div>
          <div className="home-anim-div">
            <Lottie
              className="lottie-anim"
              // width="400px"
              // height="400px"
              options={defaultOptions}
            />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default AddAppointment;
