"use client";
import React, { useState } from "react";

const RequestPaymentPage = () => {
  const [walletType, setWalletType] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("secure");
  const [walletAddress, setWalletAddress] = useState("");

  // Function to determine placeholder text based on the selected wallet
  const getCoinType = () => {
    switch (walletType) {
      case "metamask":
        return "ETH";
      case "coinbase":
        return "BTC";
      case "ledger":
        return "USDC";
      default:
        return "USDC";
    }
  };

  // Check if the form is valid based on the selected fields
  const isFormValid = () => {
    if (!walletType || !amount) {
      return false; // Wallet type and amount are required
    }
    if (transactionType === "secure" && !walletAddress) {
      return false; // Wallet address is required for secure transactions
    }
    return true;
  };

  const handleRequestPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Please fill in all required fields.");
      return;
    }
    alert(
      `Payment requested to ${
        walletAddress || "Public Transaction"
      } for ${amount} ${getCoinType()}`
    );
  };

  const validRequest = () => {
    return true;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100">
      {/* Form Container */}
      <form
        onSubmit={handleRequestPayment}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg"
      >
        {/* Header */}
        <div className="flex items-center mb-4">
          <button className="mr-2 text-lg font-bold" type="button">
            &larr;
          </button>
          <h1 className="text-lg font-semibold text-black">Request Payment</h1>
        </div>

        {/* Confirm Request Info */}
        <p className="text-gray-500 text-sm mb-4">
          Confirm request information
        </p>

        {/* Recipient Wallet */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Recipient Wallet
          </label>
          <select
            value={walletType}
            onChange={(e) => setWalletType(e.target.value)}
            className="w-full p-3 border rounded-lg text-gray-500 bg-gray-50 focus:outline-none"
          >
            <option value="" disabled>
              Choose Wallet Type
            </option>
            <option value="metamask">MetaMask</option>
            <option value="coinbase">Coinbase</option>
            <option value="ledger">Ledger</option>
          </select>
        </div>

        {/* Amount Input with USDC suffix and numpad on mobile */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Amount
          </label>
          <div className="flex items-center border rounded-lg">
            <input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 text-gray-700 focus:outline-none rounded-l-lg"
            />
            <span className="p-3 bg-gray-100 text-gray-700 rounded-r-lg">
              USDC
            </span>
          </div>
        </div>

        {/* Secure Transaction */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Secure Transaction
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              className={`flex-1 p-3 rounded-lg font-semibold ${
                transactionType === "secure"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
              onClick={() => setTransactionType("secure")}
            >
              Secure
            </button>
            <button
              type="button"
              className={`flex-1 p-3 rounded-lg font-semibold ${
                transactionType === "public"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
              onClick={() => setTransactionType("public")}
            >
              Public
            </button>
          </div>
        </div>

        {/* Recipient Wallet Address: Only visible if "Secure" is selected */}
        {transactionType === "secure" && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Recipient Wallet Address
            </label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none"
            />
          </div>
        )}

        {/* Request Button */}
        <button
          type="submit"
          disabled={!isFormValid()}
          onClick={() => {
            if (validRequest()) {
                (window.location.href = "/requestsuccess")
            } else {

            }
        }}
          className={`w-full p-3 rounded-lg font-semibold text-lg ${
            isFormValid()
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Request
        </button>
      </form>
    </div>
  );
};

export default RequestPaymentPage;
