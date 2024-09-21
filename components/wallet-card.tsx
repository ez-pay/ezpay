"use client";
import React, { useState } from "react";

// Mock data for wallets
const wallets = [
  { id: 1, address: "0x0738212345", balance: "3,469.52 USDC" },
  { id: 2, address: "0x0829374456", balance: "2,000.00 USDC" },
  { id: 3, address: "0x0935485767", balance: "5,120.30 USDC" },
];

export default function WalletCard() {
  // State to hold the selected wallet
  const [selectedWallet, setSelectedWallet] = useState(wallets[0]);

  // Handle change function for dropdown
  const handleSelectWallet = (event) => {
    const walletId = parseInt(event.target.value, 10);
    const wallet = wallets.find((w) => w.id === walletId);
    setSelectedWallet(wallet);
  };

  return (
    <div className="flex justify-center mt-12">
      <div className="bg-gradient-to-r from-purple-800 to-blue-400 p-4 rounded-xl shadow-lg w-80">
        <div className="text-white">
          <h2 className="text-lg font-semibold">Mario Alvaro</h2>
          <p className="text-sm">Circle Wallet</p>
          <p className="text-sm mb-4">{selectedWallet.address}</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">{selectedWallet.balance}</span>
            <select
              onChange={handleSelectWallet}
              className="bg-transparent text-white outline-none cursor-pointer"
              value={selectedWallet.id}
            >
              {wallets.map((wallet) => (
                <option key={wallet.id} value={wallet.id}>
                  {wallet.address}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
