"use client";
import React from 'react';
import SubmitButton from '@/components/ui/SubmitButton';
import {callContractChallenge} from "@/utils/transaction";

export default function PaymentConfirmation(){
    const paymentData ={
        token: 'USDC',
        wallet: '',
        paymentId: '2397924820209302392039',
        paymentDate: '01/10/2019',
        amount: '1000 USDC',
      };

    const handleConfirm= async()=>{
        console.log("hello");
    }
    
    return(<>
    
    <div className="max-w-xs mx-auto p-5 bg-white h-screen flex flex-col justify-between">
      <header className="flex justify-start items-center mb-5">
        <button className="text-2xl mr-2">&lt;</button>
        <h2 className="text-lg font-semibold text-left text-gray-800">Confirm Payment</h2>
      </header>

      <div className="mb-5">
        <label className="block mb-2 font-semibold text-sm text-gray-500">Your Wallet</label>
        <select className="w-full p-3 border border-gray-200 rounded-lg text-base text-gray-800 bg-gray-100" value={paymentData.wallet} disabled>
          <option value="">Choose Wallet</option>
        </select>
      </div>

      <div className="bg-white p-5 rounded-lg shadow-md mb-5">
        <div className="mb-5">
          <label className="block mb-2 font-semibold text-sm text-gray-500">Token</label>
          <span className="text-base font-bold text-gray-800">{paymentData.token}</span>
        </div>
        <div className="mb-5">
          <label className="block mb-2 font-semibold text-sm text-gray-500">Payment ID</label>
          <span className="text-base font-bold text-gray-800">{paymentData.paymentId}</span>
        </div>
        <div className="mb-5">
          <label className="block mb-2 font-semibold text-sm text-gray-500">Payment Date</label>
          <span className="text-base font-bold text-gray-800">{paymentData.paymentDate}</span>
        </div>
      </div>

      <div className="mb-5 bg-white p-5 rounded-lg shadow-md">
        <label className="block mb-2 font-semibold text-sm text-gray-500">Amount</label>
        <span className="text-2xl font-bold text-red-600">{paymentData.amount}</span>
      </div>

      <button onClick={handleConfirm} className="bg-purple-700 text-white py-3 rounded-lg font-medium">Fuck</button>

      <SubmitButton text="Confirm & Send"/>
    </div>
    
    </>);
}