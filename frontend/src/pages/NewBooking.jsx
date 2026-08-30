import React, { useEffect, useState } from "react";
import DoctorList from "../components/NewBooking/DoctorList";
import TimeSlots from "../components/NewBooking/TimeSlots";
import DateSelector from "../components/NewBooking/DateSelector";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";

export default function NewBooking() {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

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
      try {
        const res = await axiosInstance.get("/api/appointments/slots", {
          params: { doctorId: selectedDoctor._id, date: selectedDate },
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTimeSlots(res.data);
        setSelectedTimeSlot(null);
      } catch (error) {
        alert(error.response?.data?.message ?? "Failed to load time slots.");
      }
    };
    fetchTimeSlots();
  }, [selectedDoctor, selectedDate, user]);

  return (
    <div className="container mx-auto p-6 grid grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Doctors</h2>
        <DoctorList
          doctors={doctors}
          selectedDoctor={selectedDoctor}
          onSelect={setSelectedDoctor}
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

        {selectedDoctor && selectedDate && (
          <TimeSlots
            timeSlots={timeSlots}
            selectedTimeSlot={selectedTimeSlot}
            onSelect={setSelectedTimeSlot}
          />
        )}
      </div>
    </div>
  );
}
