const User = require("../models/User");

const FIXED_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select(
      "name specialty",
    );
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAvailableSlots = async (req, res) => {
  const { doctorId, date } = req.query;
  try {
    if (!doctorId || !date) {
      return res
        .status(400)
        .json({ message: "doctorId and date are required" });
    }
    const slots = FIXED_SLOTS.map((time) => ({ time, available: true }));
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDoctors, getAvailableSlots };
