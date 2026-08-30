const express = require("express");
const {
  getDoctors,
  getAvailableSlots,
  createAppointment,
  getPatientAppointments,
} = require("../controllers/appointmentController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/doctors", protect, getDoctors);
router.get("/slots", protect, getAvailableSlots);
router.get("/patient", protect, getPatientAppointments);

router.post("/", protect, createAppointment);

module.exports = router;
