import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="mx-auto mt-20 text-center">
      <h1 className="text-3xl font-bold mb-4">Hospital Management System</h1>
      <p className="text-gray-600 mb-8">
        Book appointments with doctors, manage your schedule, and keep your
        profile up to date - all in one place.
      </p>

      {user ? (
        <Link
          to={
            user.role === "doctor"
              ? "/doctor-appointments"
              : "/patient-appointments"
          }
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Go to My Appointments
        </Link>
      ) : (
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-600 text-white px-6 py-3 rounded"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
