const Appointment = require("../models/appointment");

exports.getAppointmentById = (req, res, next, id) => {
  // console.log(req.params);
  Appointment.findById(id).exec((err, appointment) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "No application Found in DB",
      });
    }
    req.appointment = appointment;
    next();
  });
};

exports.createAppointment = (req, res) => {
  const appointment = new Appointment(req.body);
  // console.log(appointment);
  appointment.save((err, createdappointment) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        error: "appointment not saved in database",
      });
    } else {
      console.log(createdappointment);
      res.json({ createdappointment });
    }
  });
};

exports.getAppointment = (req, res) => {
  console.log(req.appointment);
  return res.json(req.appointment);
};

exports.getAllAppointments = (req, res) => {
  Appointment.find().exec((err, appointments) => {
    if (err) {
      return res.status(400).json({
        error: "No appointments found",
      });
    } else {
      res.json(appointments);
    }
  });
};

exports.updateAppointment = (req, res) => {
  const appointment = req.appointment;
  console.log(appointment);
  appointment.date = req.body.date;
  appointment.time = req.body.time;
  appointment.save((err, updatedAppointment) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Failed to update Appointment",
      });
    }
    res.json(updatedAppointment);
  });
};

exports.removeAppointment = (req, res) => {
  const appointment = req.appointment;
  Appointment.remove((err, appointment) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this appointment",
      });
    }
    res.json({
      message: "appointment is succesfully deleted",
    });
  });
};
