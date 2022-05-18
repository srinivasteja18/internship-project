const express = require("express");
const router = express.Router();
const {
  getAppointmentById,
  createAppointment,
  getAppointment,
  getAllAppointments,
  updateAppointment,
  removeAppointment,
} = require("../controllers/appointment");

//params
router.param("appointmentId", getAppointmentById);

//create
router.post("/appointment/create", createAppointment);

//get
router.get("/appointment/:appointmentId", getAppointment);
router.get("/appointments", getAllAppointments);

//update
router.put("/appointment/update/:appointmentId", updateAppointment);

//delete
router.delete("/appointment/delete/:appointmentId", removeAppointment);
module.exports = router;
