import React, { useEffect, useState } from "react";
import DoctorList from "../components/NewBooking/DoctorList";
import TimeSlots from "../components/NewBooking/TimeSlots";
import DateSelector from "../components/NewBooking/DateSelector";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";
import { useNavigate } from "react-router-dom";

export default function NewBooking() {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axiosInstance.get("/api/appointments/doctors", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setDoctors(res.data);
      } catch (error) {
        alert(error.response?.data?.message ?? "Failed to load doctors.");
      }
    };
    fetchDoctors();
  }, [user]);

  useEffect(() => {
    if (!selectedDoctor || !selectedDate) return;
    const fetchTimeSlots = async () => {
      setSelectedTimeSlot(null); // reset the selected time slot state when changing date
      try {
        const res = await axiosInstance.get("/api/appointments/slots", {
          params: { doctorId: selectedDoctor._id, date: selectedDate },
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTimeSlots(res.data);
      } catch (error) {
        alert(error.response?.data?.message ?? "Failed to load time slots.");
      }
    };
    fetchTimeSlots();
  }, [selectedDoctor, selectedDate, user]);

  const handleBookingSubmit = async () => {
    try {
      await axiosInstance.post(
        "/api/appointments",
        {
          doctorId: selectedDoctor._id,
          date: selectedDate,
          time: selectedTimeSlot,
        },
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
      alert(
        "Book Appointment Successfully. Please wait for response from our doctor.",
      );
      navigate("/patient-appointments");
    } catch (error) {
      alert(
        `${error.response?.data?.message ?? "Booking failed."} Please try again.`,
      );
      navigate(0); // reload state
    }
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Doctors</h2>
        <DoctorList
          doctors={doctors}
          selectedDoctor={selectedDoctor}
          onSelect={(doctor) => {
            setSelectedDoctor(doctor);
            setSelectedDate("");
            setSelectedTimeSlot(null);
          }}
        />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Select a date and time</h2>
        {selectedDoctor && (
          <DateSelector
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
          />
        )}

        {selectedDate && (
          <TimeSlots
            timeSlots={timeSlots}
            selectedTimeSlot={selectedTimeSlot}
            onSelect={setSelectedTimeSlot}
          />
        )}

        {selectedTimeSlot && (
          <button
            onClick={handleBookingSubmit}
            className="mt-6 w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            Book Appointment
          </button>
        )}
      </div>
    </div>
  );
}
