import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteAppointment, getAllAppointments } from "./ApiCalls/helper";

import Base from "./core/Base";
import animationData from "./anims/list.json";
import Lottie from "react-lottie";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const preLoad = () => {
    getAllAppointments().then((data) => {
      if (data.error) {
        toast(data.error, { type: "error" });
        console.log("USER ORDERS ERROR");
      } else {
        setAppointments(data);
      }
    });
  };
  const deletethisAppointment = (appointmentId) => {
    deleteAppointment(appointmentId).then((data) => {
      if (data.error) {
        console.log(data.error);
        toast("Appointment cancel Failed!!", { type: "error" });
      } else {
        toast("Appointment cancelled Succesfully", { type: "success" });
        preLoad();
      }
    });
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    preLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allAppointments = () => (
    <div className="appointments-section">
      {appointments && appointments.length ? (
        appointments.map((appointment, index) => (
          <div key={index} className="appointments-container">
            <h3>Appointment No: {index + 1}</h3>
            <div className="appointments-card">
              <div className="appointment-details">
                <p className="text">
                  <span className="text-span">Patient Name: </span>{" "}
                  {appointment.name}
                </p>
                <p className="text">
                  <span className="text-span">Patient MobileNumber: </span>{" "}
                  {appointment.mobile}
                </p>
                <p className="text">
                  <span className="text-span">Doctor Name: </span>{" "}
                  {appointment.doctor}
                </p>
                <p className="text">
                  <span className="text-span">Appointment Date: </span>{" "}
                  {appointment.date.slice(0, 10)}
                </p>
                <p className="text">
                  <span className="text-span">Appointment Time: </span>{" "}
                  {appointment.time}
                </p>
              </div>
              <div className="appointment-buttons">
                <Link
                  to={`/appointment/update/${appointment._id}`}
                  className="link-button"
                >
                  Update Appointment
                </Link>
                <button
                  onClick={() => deletethisAppointment(appointment._id)}
                  className="button"
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>No Appointments Scheduled</h1>
      )}
      <div className="home-div">
        <Link to="/" className="link-button">
          Back
        </Link>
      </div>
    </div>
  );

  return (
    <Base title="" description="">
      <div className="middle-section">
        <div className="create-container">
          <div>
            <h1 style={{ textAlign: "center" }}>My Appointments</h1>
            <h3 style={{ textAlign: "center" }}>
              update and delete your Appointments
            </h3>
            {allAppointments()}
          </div>
          <div className="home-anim-div">
            <Lottie className="lottie-anim" options={defaultOptions} />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default MyAppointments;
