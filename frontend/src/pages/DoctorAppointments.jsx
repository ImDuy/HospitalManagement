import React, { useState } from "react";
import AppointmentTable from "../components/AppointmentTable";

const mockAppointments = [
  {
    _id: "1",
    name: "John Tran",
    date: "2026-09-12",
    time: "11:00",
    status: "pending",
  },
  {
    _id: "2",
    name: "Maria Chen",
    date: "2026-09-13",
    time: "09:30",
    status: "pending",
  },
  {
    _id: "3",
    name: "Linh Pham",
    date: "2026-09-10",
    time: "14:00",
    status: "approved",
  },
  {
    _id: "4",
    name: "Tom Baker",
    date: "2026-09-09",
    time: "16:30",
    status: "cancelled",
  },
];

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState(mockAppointments);

  const handleApprove = (id) => {
    setAppointments((prev) =>
      prev.map((e) => (e._id === id ? { ...e, status: "approved" } : e)),
    );
  };
  const handleDecline = (id) => {
    setAppointments((prev) =>
      prev.map((e) => (e._id === id ? { ...e, status: "cancelled" } : e)),
    );
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>
      <AppointmentTable
        forDoctor={true}
        appointments={appointments}
        onApprove={handleApprove}
        onDecline={handleDecline}
      />
    </div>
  );
}
