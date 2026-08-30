import React from "react";

const STYLES = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  cancelled: "bg-gray-100 text-gray-500",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs capitalize ${STYLES[status]}`}
    >
      {status}
    </span>
  );
}
