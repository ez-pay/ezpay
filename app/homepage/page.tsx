"use client";
import NavBar from "@/components/bottom-nav";
import WalletCard from "@/components/wallet-card";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-between h-screen bg-gray-100 pb-16">
      {" "}
      {/* Adjust padding here */}
      {/* Top Section */}
      <div className="bg-purple-600 text-white pt-8 pb-4 px-6 rounded-b-3xl">
        {/* User Greeting */}
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <h1 className="text-xl">Hi, Mario Alvaro</h1>
        </div>
      </div>
      {/* Wallet Card */}
      <WalletCard />
      {/* Action Buttons */}
      <div className="px-6 py-4 grid grid-cols-2 gap-4">
        <div
          className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center"
          onClick={() => (window.location.href = "/requestpayment")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-yellow-500 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c.64 0 1.17.48 1.17 1.07v5.26c0 .59-.53 1.07-1.17 1.07H6.83C6.19 15.4 5.67 14.92 5.67 14.33V9.07C5.67 8.48 6.19 8 6.83 8H12zM16.5 12c0-.47.4-.84.88-.84h4.12c.48 0 .88.37.88.84 0 .47-.4.84-.88.84h-4.12c-.48 0-.88-.37-.88-.84z"
            />
          </svg>
          <span className="text-sm">Request Payment</span>
        </div>

        <div
          className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center"
          onClick={() => (window.location.href = "/requestedpayment")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-500 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 9v6h8V9H6zM14 3h4a1 1 0 011 1v6a1 1 0 01-1 1h-4V3z"
            />
          </svg>
          <span className="text-sm">Requested Payment</span>
        </div>

        <div
          className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center"
          onClick={() => (window.location.href = "/sendtransaction")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-red-500 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12h6M3 12h6m6-6l-6 6m0 0l-6 6"
            />
          </svg>
          <span className="text-sm">Send</span>
        </div>

        <div
          className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center"
          onClick={() => (window.location.href = "/payment")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-teal-500 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 11h14M5 11l7 7M5 11l7-7"
            />
          </svg>
          <span className="text-sm">Make Payment</span>
        </div>
      </div>
      <NavBar />
    </div>
  );
}
