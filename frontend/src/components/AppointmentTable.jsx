import React from "react";
import StatusBadge from "./StatusBadge";

export default function AppointmentTable({
  appointments,
  forDoctor,
  onApprove,
  onDecline,
}) {
  if (appointments.length === 0) {
    return <p className="text-gray-500">No appointment yet.</p>;
  }

  return (
    <table className="w-full bg-white rounded-lg shadow">
      <thead>
        <tr className="text-left text-xs text-gray-400 border-b">
          <th className="p-4">{forDoctor ? "Patient" : "Doctor"}</th>
          {!forDoctor && <th className="p-4">Specialty</th>}
          <th className="p-4">Date</th>
          <th className="p-4">Time</th>
          <th className="p-4">Status</th>
          {forDoctor && <th className="p-4">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {appointments.map((a) => (
          <tr key={a._id} className="border-b">
            <td className="p-4">{a.name}</td>
            {!forDoctor && <td className="p-4">{a.specialty}</td>}
            <td className="p-4">{a.date}</td>
            <td className="p-4">{a.time}</td>
            <td className="p-4">
              <StatusBadge status={a.status} />
            </td>
            {forDoctor && a.status === "pending" && (
              <td className="p-4 space-x-2">
                <button
                  onClick={() => onApprove(a._id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => onDecline(a._id)}
                  className="border px-3 py-1 rounded"
                >
                  Decline
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
