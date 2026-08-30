import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";
import AppointmentTable from "../components/AppointmentTable";

export default function PatientAppointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axiosInstance.get("/api/appointments/patient", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setAppointments(res.data);
      } catch (error) {
        alert(error.response?.data?.message ?? "Failed to load appointments.");
      }
    };
    fetchAppointments();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>
      <AppointmentTable appointments={appointments} forDoctor={false} />
    </div>
  );
}
