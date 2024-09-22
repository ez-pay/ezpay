"use client";
import React, { useState, useEffect } from 'react';

// Function to format today's date
const getFormattedDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function ConfirmTransactionPage() {
  const [walletFromBackend, setWalletFromBackend] = useState('');
  const recipientAddress = '0x021439248'; // Mock recipient wallet address
  const amount = '1000'; // Mock amount
  const paymentDate = getFormattedDate();

  // Fetch Your Wallet from backend (mock API call)
  useEffect(() => {
    const fetchWallet = async () => {
      // Simulate an API call to fetch wallet
      const wallet = '0x0214*****'; // Mock "Your Wallet"
      setWalletFromBackend(wallet);
    };

    fetchWallet();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center mb-4">
          <button className="mr-2 text-lg font-bold" type="button">&larr;</button>
          <h1 className="text-lg font-semibold text-black">Confirm Transaction</h1>
        </div>

        <div className="border p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-500">Token</span>
            <span className="text-sm font-semibold">USDC</span>
          </div>

          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-500">Your Wallet</span>
            <span className="text-sm font-semibold">{walletFromBackend}</span>
          </div>

          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-500">Recipient Wallet</span>
            <span className="text-sm font-semibold">{recipientAddress}</span>
          </div>

          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-500">Payment Date</span>
            <span className="text-sm font-semibold">{paymentDate}</span>
          </div>

          <div className="flex justify-between items-center border-t pt-3 mt-3">
            <span className="text-sm font-medium text-gray-500">Amount</span>
            <span className="text-lg font-semibold text-red-500">{amount} USDC</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 p-3 bg-indigo-600 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700"
        >
          Confirm & Send
        </button>
      </div>
    </div>
  );
}
