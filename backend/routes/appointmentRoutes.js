const express = require("express");
const {
  getDoctors,
  getAvailableSlots,
} = require("../controllers/appointmentController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/doctors", protect, getDoctors);
router.get("/slots", protect, getAvailableSlots);

module.exports = router;
