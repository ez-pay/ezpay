"use client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";

export default function ConfirmationPayment() {
  const [walletType, setWalletType] = useState("");

  const isFormValid = () => {
    return walletType !== "";
  };

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

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-500 mb-1">
          Your Wallet
        </label>
        <select
          value={walletType}
          onChange={(e) => setWalletType(e.target.value)}
          className="w-full p-3 border rounded-lg text-gray-500 bg-gray-50 focus:outline-none"
        >
          <option value="" disabled>
            Choose Wallet
          </option>
          <option value="metamask">MetaMask</option>
          <option value="coinbase">Coinbase</option>
          <option value="ledger">Ledger</option>
        </select>
      </div>

      {/* Transaction Details Card */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <div className="mb-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Token</span>
            <span className="font-medium">USDC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Payment ID</span>
            <span className="font-medium">08284298340927843</span>
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
        onClick={() => (window.location.href = "/paymentsuccess")}
        disabled={!isFormValid()}
        className={`w-full p-3 rounded-lg font-semibold text-lg ${
          isFormValid()
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Confirm & Send
      </button>
    </div>
  );
}
