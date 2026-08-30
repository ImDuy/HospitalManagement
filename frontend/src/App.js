import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import DoctorAppointments from "./pages/DoctorAppointments";
import Login from "./pages/Login";
import NewBooking from "./pages/NewBooking";
import PatientAppointments from "./pages/PatientAppointments";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient-appointments" element={<PatientAppointments />} />
        <Route path="/new-booking" element={<NewBooking />} />
        <Route path="/doctor-appointments" element={<DoctorAppointments />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
