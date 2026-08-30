import React from "react";

export default function TimeSlots({ timeSlots, selectedTimeSlot, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-3 mt-4">
      {timeSlots.map((slot) => (
        <button
          key={slot.time}
          disabled={!slot.available}
          onClick={() => onSelect(slot.time)}
          className={`p-3 rounded border ${
            !slot.available
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : selectedTimeSlot === slot.time
                ? "bg-blue-600 text-white"
                : "bg-white"
          }`}
        >
          {slot.time}{" "}
          {!slot.available && (
            <span className="block text-xs">Unavailable</span>
          )}
        </button>
      ))}
    </div>
  );
}
