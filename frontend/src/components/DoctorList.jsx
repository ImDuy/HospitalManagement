import React from "react";

export default function DoctorList({ doctors, selectedDoctor, onSelect }) {
  return (
    <div>
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
    </div>
  );
}
