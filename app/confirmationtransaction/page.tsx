"use client"
export default function ConfirmationTransaction() {
  return (
    <div className="flex flex-col justify-between h-screen p-6 bg-gray-100">
      {/* Back Button and Title */}
      <div className="flex items-center justify-between mb-6">
        <button className="text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-lg font-semibold">Confirm Transaction</h1>
        <span></span> {/* Empty span for spacing */}
      </div>

      {/* Transaction Details Card */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <div className="mb-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Token</span>
            <span className="font-medium">USDC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Your Wallet</span>
            <span className="font-medium">0x0214*****</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Recipient Wallet</span>
            <span className="font-medium">0x021439248</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Payment Date</span>
            <span className="font-medium">01/10/2019</span>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-200" />

        {/* Amount Section */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Amount</span>
          <span className="text-2xl font-bold text-red-500">1000 USDC</span>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        className="mt-6 bg-purple-600 text-white text-lg font-semibold py-3 rounded-lg w-full shadow-md"
        onClick={() => (window.location.href = "/transactionsuccess")}
      >
        Confirm & Send
      </button>
    </div>
  );
}
