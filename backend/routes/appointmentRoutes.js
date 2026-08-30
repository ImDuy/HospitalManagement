const express = require("express");
const {
  getDoctors,
  getAvailableSlots,
  createAppointment,
} = require("../controllers/appointmentController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/doctors", protect, getDoctors);
router.get("/slots", protect, getAvailableSlots);
router.post("/", protect, createAppointment);

module.exports = router;
