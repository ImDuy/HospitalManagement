import React, { useState } from "react";
import DoctorList from "../components/NewBooking/DoctorList";
import TimeSlots from "../components/NewBooking/TimeSlots";
import DateSelector from "../components/NewBooking/DateSelector";

export default function NewBooking() {
  const mockDoctors = [
    { _id: 1, name: "ABCSX", specialty: "Dermatorlogy" },
    { _id: 2, name: "James", specialty: "" },
  ];
  const mockSlots = [
    { time: "09:00", available: true },
    { time: "10:00", available: false },
    { time: "11:00", available: true },
    { time: "13:00", available: true },
    { time: "14:00", available: false },
    { time: "15:00", available: true },
  ];
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const [selectedTime, setSelectedTime] = useState(null);
  return (
    <div className="container mx-auto p-6 grid grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Doctors</h2>
        <DoctorList
          doctors={mockDoctors}
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
            slots={mockSlots}
            selectedTime={selectedTime}
            onSelect={setSelectedTime}
          />
        )}
      </div>
    </div>
  );
}
