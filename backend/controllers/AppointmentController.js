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
        .status(500)
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

const createAppointment = async (req, res) => {
  const { doctorId, date, time } = req.body;
  try {
    // re-validation to make sure time slot is available
    const existing = await Appointment.findOne({
      doctorId,
      date,
      time,
      status: { $ne: "cancelled" },
    });
    if (existing) {
      return res
        .status(500)
        .json({ message: "This time slot has been occupied." });
    }
    // creating appointment
    const appointment = await Appointment.create({
      patientId: req.user.id,
      doctorId,
      date,
      time,
      status: "pending",
    });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.user.id,
    }).populate("doctorId", "name specialty");
    const formatted = appointments.map((a) => ({
      _id: a._id,
      name: a.doctorId.name,
      specialty: a.doctorId.specialty,
      date: a.date,
      time: a.time,
      status: a.status,
    }));

    const STATUS_ORDER = { approved: 0, pending: 1, cancelled: 2 };
    formatted.sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]); // sorting to show approved appointments first

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.user.id,
    }).populate("patientId", "name");

    const formatted = appointments.map((a) => ({
      _id: a._id,
      name: a.patientId.name,
      date: a.date,
      time: a.time,
      status: a.status,
    }));

    const STATUS_ORDER = { pending: 0, approved: 1, cancelled: 2 };
    formatted.sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]); // sorting to show pending appointments first

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(500).json({ message: "Appointment not found." });
    }

    appointment.status = status;
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDoctors,
  getAvailableSlots,
  createAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
};
