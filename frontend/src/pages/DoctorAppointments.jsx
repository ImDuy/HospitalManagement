import React, { useEffect, useState } from "react";
import AppointmentTable from "../components/AppointmentTable";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";

export default function DoctorAppointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await axiosInstance.get("/api/appointments/doctor", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setAppointments(res.data);
      } catch (error) {
        alert(
          error.response?.data?.message ??
            "Failed to load appointment enquiries.",
        );
      }
    };
    fetchEnquiries();
  }, [user]);

  const handleApprove = (id) => {};
  const handleDecline = (id) => {};
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
