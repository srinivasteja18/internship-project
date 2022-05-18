import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Base from "./core/Base";
import { getAppointment, updateAppointment } from "./ApiCalls/helper";
import animationData from "./anims/update.json";
import Lottie from "react-lottie";

const UpdateAppointment = ({ match }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    mobile: "",
    doctor: "",
    doctors: ["x", "y", "z"],
    date: "",
    time: "",
    loading: false,
    error: "",
    createdAppointment: "",
    getRedirect: false,
  });
  const { appointmentId } = useParams();
  const { name, mobile, doctor, date, getRedirect, time } = values;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const preLoad = () => {
    getAppointment(appointmentId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          mobile: data.mobile,
          doctor: data.doctor,
          date: data.Date,
          time: data.time,
          doctors: ["x", "y", "z"],
        });
      }
    });
  };
  useEffect(() => {
    preLoad(appointmentId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setValues({ ...values, error: false, getRedirect: false, [field]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, getRedirect: false });
    updateAppointment(appointmentId, values).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
        toast("Appointment Added Failed", { type: "error" });
      } else {
        setValues({
          ...values,
          name: "",
          mobile: "",
          doctor: "",
          Date: "",
          time: "",
          updatedAppointment: data.name,
          photo: "",
          getRedirect: true,
        });
      }
    });
  };

  const redirectUser = () => {
    if (getRedirect) {
      toast("Appointment updated Succesfully", { type: "success" });
      setTimeout(() => navigate("/"), 4000);
    }
  };

  const AppointmentForm = () => {
    return (
      <div className="Application-container" style={{ textAlign: "center" }}>
        <form className="Appointment-card">
          <div className="Appointment-helper">
            <label className="Appointment-labels">Name: </label>
            <p className="Appointment-p text">{name}</p>
          </div>
          <div className="Appointment-helper">
            <label className="Appointment-labels">Mobile: </label>
            <p className="Appointment-p text">{mobile}</p>
          </div>
          <div className="Appointment-helper">
            <label className="Appointment-labels">Doctor: </label>
            <p className="Appointment-p text">{doctor}</p>
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
            Update Appointment
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
    <Base title="Update Appointment" description="">
      <div className="middle-section">
        {redirectUser()}
        <div className="create-container">
          <div>
            <h1 style={{ marginLeft: "1rem" }}>Update your Appointment</h1>
            {AppointmentForm()}
          </div>
          <div className="home-anim-div-update">
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

export default UpdateAppointment;
