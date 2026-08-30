const Appointment = require("../models/Appointment");
const User = require("../models/User");

const FIXED_TIME_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

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

    const bookedAppointments = await Appointment.find({
      doctorId,
      date,
      status: { $ne: "cancelled" }, // both approved and pending appointment occupy the time slot
    }).select("time");
    const occupiedTimeSlots = bookedAppointments.map((a) => a.time);

    const slots = FIXED_TIME_SLOTS.map((time) => ({
      time,
      available: !occupiedTimeSlots.includes(time),
    }));

    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDoctors, getAvailableSlots };
