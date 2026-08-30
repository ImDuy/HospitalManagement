const express = require("express");
const {
  getDoctors,
  getAvailableSlots,
  createAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
} = require("../controllers/AppointmentController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/doctors", protect, getDoctors);
router.get("/slots", protect, getAvailableSlots);
router.get("/patient", protect, getPatientAppointments);
router.get("/doctor", protect, getDoctorAppointments);

router.post("/", protect, createAppointment);
router.put("/:id/status", protect, updateAppointmentStatus);

module.exports = router;
