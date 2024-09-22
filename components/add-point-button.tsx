// components/AddPointButton.js
"use client";
import { useState } from "react";

export default function AddPointButton() {
  const [loading, setLoading] = useState(false);

  const addPoint = async () => {
    setLoading(true);
    console.log("botton is pressed");
    const response = await fetch("/api/add-point", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "f5d6f17c-649f-45ea-95b0-f126a8fb6e8d",
        points: 1, // adding 1 point
      }),
    });

    if (response.ok) {
      alert("Point added!");
    } else {
      const error = await response.json();
      alert(`Failed to add point: ${error.error}`);
    }

    setLoading(false);
  };

  return (
    <button disabled={loading}>
      {loading ? "Adding Point..." : "Add 1 Point"}
    </button>
  );
}
