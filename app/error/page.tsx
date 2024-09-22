"use client";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl text-red-500 mb-3">Payment Error!</h1>
      <p className="text-xl text-gray-600 mb-5">
        Something is wrong with the Transaction! Please try again
      </p>
      <button
        className="bg-indigo-700 text-white py-3 px-6 rounded-lg text-lg cursor-pointer hover:bg-indigo-800"
        onClick={() => (window.location.href = "/homepage")}
      >
        Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
