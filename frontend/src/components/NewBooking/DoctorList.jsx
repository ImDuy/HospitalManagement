import React from "react";

export default function DoctorList({ doctors, selectedDoctor, onSelect }) {
  if (doctors.length === 0) {
    return <p className="text-gray-500">No doctors available at the moment.</p>;
  }
  return (
    <div className="space-y-4">
      {doctors.map((doctor) => (
        <div
          key={doctor._id}
          onClick={() => onSelect(doctor)}
          className={`p-4 rounded cursor-pointer border ${
            selectedDoctor?._id === doctor._id
              ? "bg-blue-600 text-white"
              : "bg-white"
          }`}
        >
          <p className="font-bold">{doctor.name}</p>
          <p className="text-sm">{doctor.specialty}</p>
        </div>
      ))}
    </div>
  );
}
