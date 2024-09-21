import React from 'react';

// Mock data for the example
const requests = [
  { id: '2397924820209302392039', date: '30/10/2019', status: 'Waiting for Payment', sender: '0x0282938472', amount: '50 USDC' },
  { id: '38472397423874622373247', date: '30/10/2019', status: 'Paid', sender: '0x0282938472', amount: '50 USDC' },
  { id: '3434342387701763417697463', date: '30/10/2019', status: 'Waiting for Payment', sender: '0x0282938472', amount: '50 USDC' },
  { id: '98709863483201238478923', date: '30/10/2019', status: 'Paid', sender: '0x0282938472', amount: '50 USDC' }
];

export default function PaymentHistory() {
  return (
    <div className="p-5 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Payment Request History</h1>
      {requests.map(request => (
        <div key={request.id} className="bg-gray-100 p-4 rounded-lg mb-4 shadow">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">ID:</span>
            <span>{request.id}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Date:</span>
            <span>{request.date}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Status:</span>
            <span className={`font-semibold ${request.status === 'Paid' ? 'text-green-500' : 'text-red-500'}`}>
              {request.status}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Sender Address:</span>
            <span>{request.sender}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Amount:</span>
            <span>{request.amount}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
