import React from "react";

const getNext3WorkingDays = () => {
  const days = [];
  const date = new Date();
  date.setDate(date.getDate() + 1); // start from tomorrow

  while (days.length < 3) {
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      days.push(new Date(date));
    }
    date.setDate(date.getDate() + 1);
  }

  return days;
};

export default function DateSelector({ selectedDate, onSelect }) {
  const dates = getNext3WorkingDays();
  const formatLabel = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  return (
    <div className="flex gap-3">
      {dates.map((date) => {
        const value = date.toISOString().split("T")[0];
        const isSelected = selectedDate === value;
        return (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className={`px-4 py-3 rounded-lg border ${
              isSelected
                ? "bg-blue-600 text-white border-blue-900"
                : "bg-white border-gray-300"
            }`}
          >
            {formatLabel(date)}
          </button>
        );
      })}
    </div>
  );
}
