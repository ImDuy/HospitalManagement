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

  const handleApprove = async (id) => {
    try {
      await axiosInstance.put(
        `api/appointments/${id}/status`,
        { status: "approved" },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );
      alert("The appointment has been approved, we will inform your patient.");
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: "approved" } : a)),
      );
    } catch (error) {
      alert(
        error.response?.data?.message ??
          "Failed to approve appointment enquiry.",
      );
    }
  };
  const handleDecline = async (id) => {
    try {
      await axiosInstance.put(
        `api/appointments/${id}/status`,
        { status: "cancelled" },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );
      alert("The appointment has been cancelled, we will inform your patient.");
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: "cancelled" } : a)),
      );
    } catch (error) {
      alert(
        error.response?.data?.message ??
          "Failed to decline appointment enquiry.",
      );
    }
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
