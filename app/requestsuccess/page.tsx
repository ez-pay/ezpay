"use client";
import React from "react";

import QRCode, { QRCodeCanvas } from "qrcode.react";

const PaymentRequested = () => {
  const qrCodeValue = "23979220209302392039";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-purple-700 mb-2">
          Payment Requested!
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          You have successfully requested a payment!
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Token</span>
            <span className="font-medium">USDC</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Your Wallet</span>
            <span className="font-medium">0x0214****</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Requested Wallet</span>
            <span className="font-medium">0x8393848273</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Request Date</span>
            <span className="font-medium">01/10/2019</span>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <QRCodeCanvas value={qrCodeValue} size={200} className="mx-auto mb-4" />
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Payment ID</span>
            <div className="flex items-center">
              <span className="font-medium">{qrCodeValue}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 ml-2 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-500">Amount</span>
          <span className="text-xl font-bold text-red-500">500 USDC</span>
        </div>

        <button className="w-full bg-purple-700 text-white py-3 rounded-lg font-medium"
            onClick={() => (window.location.href = "/homepage")}>
          Back Home
        </button>
      </div>
    </div>
  );
};

export default PaymentRequested;
