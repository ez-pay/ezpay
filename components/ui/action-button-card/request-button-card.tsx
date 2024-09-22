"use client";
import React from "react";

export default function RequestButtonCard() {
  const handleClick = () => {
    // Different behavior based on the button id or title
    alert(`You clicked `);
  };

  return (
    <div
      className="flex flex-col items-center justify-center bg-gray-100 p-6 border border-gray-300 rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
      onClick={handleClick}
    >
        <img
            src="/logo.png"
            alt={`${"name"}'s profile`}
            className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <span className="text-lg font-semibold text-gray-700">Request</span>
    </div>
  );
}
