"use client"
import React, { useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode'; // Import the library

const MakePaymentPage = () => {
  const [paymentId, setPaymentId] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  const startQrScanner = () => {
    setShowScanner(true);
    
    const qrScanner = new Html5QrcodeScanner(
      'reader', // ID of the div where the camera preview will be shown
      { fps: 10, qrbox: 250 }, // Scanner configuration
      true // Verbose mode for debugging
    );

    qrScanner.render(
      (decodedText, decodedResult) => {
        // Handle the scanned QR code text
        if (!isNaN(Number(decodedText))) {
          setPaymentId(decodedText); // Auto-fill payment ID if QR code contains a number
          qrScanner.clear(); // Stop scanning
          setShowScanner(false); // Close the scanner
        }
      },
      (errorMessage) => {
        console.error(errorMessage); // Handle scan errors or empty scans
        alert('Error scanning QR code');
        qrScanner.clear(); // Stop scanning on error
        setShowScanner(false); // Close the scanner
      }
    );
  };

  const isFormValid = () => {
    return paymentId.trim() !== ''; // Ensure Payment ID is not empty
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100">
      {/* Form Container */}
      <form className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center mb-4">
          <button className="mr-2 text-lg font-bold" type="button">&larr;</button>
          <h1 className="text-lg font-semibold text-black">Make Payment</h1>
        </div>

        {/* Confirm Transaction Info */}
        <p className="text-gray-500 text-sm mb-4">Confirm transaction information</p>

        {/* Payment ID Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-500 mb-1">Payment ID</label>
          <input
            type="text"
            inputMode="numeric" // Show numpad on mobile
            pattern="[0-9]*" // Restrict input to numbers only
            placeholder="Enter Payment ID"
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value.replace(/\D/g, ''))} // Remove non-numeric characters
            className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none"
          />
        </div>

        {/* OR Divider */}
        <div className="flex items-center justify-center my-4">
          <span className="text-sm text-gray-400">OR</span>
        </div>

        {/* Scan Payment QR Button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={startQrScanner}
            className="w-full flex items-center justify-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <span className="mr-2">📷</span>
            <span>Scan Payment QR</span>
          </button>
        </div>

        {/* QR Scanner Pop-up */}
        {showScanner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="w-full max-w-md bg-white p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-center mb-4">Scan QR Code</h2>
              <div id="reader" style={{ width: '100%' }}></div>
              <button
                onClick={() => setShowScanner(false)}
                className="mt-4 p-2 w-full bg-red-600 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Continue Button */}
        <button
          type="submit"
          disabled={!isFormValid()} // Disable button if Payment ID is not filled
          className={`w-full p-3 rounded-lg font-semibold text-lg ${
            isFormValid()
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue Payment
        </button>
      </form>
    </div>
  );
};

export default MakePaymentPage;
