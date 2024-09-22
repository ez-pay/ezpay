"use client";
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';

export default function SendTransactionPage() {
  const [walletType, setWalletType] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');

  // Validation function to check if all fields are filled
  const isFormValid = () => {
    return walletType && recipientAddress && amount;
  };

  const handleSendTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert('Please fill in all required fields.');
      return;
    }
    // router.push('/')
    alert(`Transaction to ${recipientAddress} for ${amount} from ${walletType}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100">
      {/* Form Container */}
      <form onSubmit={handleSendTransaction} className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center mb-4">
          <button className="mr-2 text-lg font-bold" type="button">&larr;</button>
          <h1 className="text-lg font-semibold text-black">Send Transaction</h1>
        </div>

        {/* Confirm Request Info */}
        <p className="text-gray-500 text-sm mb-4">Confirm transaction information</p>

        {/* Wallet Dropdown */}
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

        {/* Recipient Address Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-500 mb-1">Recipient Address</label>
          <input
            type="text"
            placeholder="0x..."
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none"
          />
        </div>

        {/* Amount Input with USDC suffix */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-500 mb-1">Amount</label>
          <div className="flex items-center border rounded-lg">
            <input
              type="number"
              step="0.01"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 text-gray-700 focus:outline-none rounded-l-lg"
            />
            <span className="p-3 bg-gray-100 text-gray-700 rounded-r-lg">USDC</span>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          type="submit"
          disabled={!isFormValid()}
          className={`w-full p-3 rounded-lg font-semibold text-lg ${
            isFormValid()
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

