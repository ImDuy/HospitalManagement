import React, { useState } from "react";
import DoctorList from "../components/DoctorList";

export default function NewBooking() {
  const doctors = [
    { _id: 1, name: "ABCSX", specialty: "Dermatorlogy" },
    { _id: 2, name: "James", specialty: "" },
  ];
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  return (
    <>
      <DoctorList
        doctors={doctors}
        selectedDoctor={selectedDoctor}
        onSelect={setSelectedDoctor}
      />
    </>
  );
}
