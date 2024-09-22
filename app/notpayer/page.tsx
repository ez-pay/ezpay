"use client";
export default function PaymentFailed() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white px-4">
      {/* Unsuccessful Message */}
      <h1 className="text-red-500 text-2xl font-semibold mb-2">
        Payment Request Unsuccessful!
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        You are not the payer of this Transaction!
      </p>

      {/* Error Icon */}
      <div className="flex justify-center mb-6">
        <div className="bg-red-100 p-8 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>

      {/* Back Home Button */}
      <button
        className="bg-purple-600 text-white text-lg font-semibold py-3 px-12 rounded-full shadow-md"
        onClick={() => (window.location.href = "/homepage")}
      >
        Back Home
      </button>
    </div>
  );
}
