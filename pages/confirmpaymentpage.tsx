"use client"
import React, { useState } from 'react';

type ConfirmPaymentProps = {
    walletType: string;
    paymentId: string;
    amount: string;
  };
  
  const ConfirmPaymentPage: React.FC<ConfirmPaymentProps> = ({paymentId, amount }) => {
    const getFormattedDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so +1
        const year = today.getFullYear();
        return `${day}/${month}/${year}`;
      };

    const [walletType, setWalletType] = useState('');

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100">
      {/* Form Container */}
      <form className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center mb-4">
          <button className="mr-2 text-lg font-bold" type="button">&larr;</button>
          <h1 className="text-lg font-semibold text-black">Confirm Payment</h1>
        </div>

        {/* Your Wallet */}
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

        {/* Token, Payment ID, Payment Date */}
        <div className="border p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-500">Token</span>
            <span className="text-sm font-semibold">USDC</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-500">Payment ID</span>
            <span className="text-sm font-semibold">{paymentId}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-500">Payment Date</span>
            <span className="text-sm font-semibold">{getFormattedDate()}</span>
          </div>

          {/* Amount */}
          <div className="flex justify-between items-center border-t pt-3 mt-3">
            <span className="text-sm font-medium text-gray-500">Amount</span>
            <span className="text-lg font-semibold text-red-500">{amount} USDC</span>
          </div>
        </div>

        {/* Confirm & Send Button */}
        <button
          type="submit"
          className="w-full mt-6 p-3 bg-indigo-600 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700"
        >
          Confirm & Send
        </button>
      </form>
    </div>
  );
};

export default ConfirmPaymentPage;
