import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";

const SPECIALTIES = ["Cardiology", "General Medicine", "Dermatology"];

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // input validation
    if (!formData.name) return alert("Please enter your name.");
    if (formData.role === "doctor" && !formData.specialty)
      return alert("Please select your specialty.");
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      return alert("Please enter a valid email address.");
    if (formData.password.length < 6)
      return alert("Password must be at least 6 characters.");
    if (formData.password !== formData.confirmPassword)
      return alert("Passwords do not match.");

    // connect to backend
    try {
      const { confirmPassword, ...userData } = formData;
      if (userData.role === "patient") delete userData.specialty;
      await axiosInstance.post("/api/auth/register", formData);
      alert("Registration successful. Please log in.");
      navigate("/login");
    } catch (error) {
      alert(
        `${error.response?.data?.message ?? "Registration failed."} Please try again.`,
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

        <div className="mb-4 flex gap-4 justify-center">
          <label>
            <input
              type="radio"
              name="role"
              value="patient"
              checked={formData.role === "patient"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value,
                })
              }
            />{" "}
            Patient
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="doctor"
              checked={formData.role === "doctor"}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            />{" "}
            Doctor
          </label>
        </div>

        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />

        {formData.role === "doctor" && (
          <select
            value={formData.specialty}
            onChange={(e) =>
              setFormData({ ...formData, specialty: e.target.value })
            }
            className="w-full mb-4 p-2 border rounded"
          >
            <option value="">Select specialty</option>
            {SPECIALTIES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        )}

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
