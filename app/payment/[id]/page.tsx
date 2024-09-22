"use client";
import React from 'react';
import PostPayment from '@/components/PostPayment';
import PaymentConfirmation from '@/components/PaymentConfirmation';
import {useState} from "react";
import SuccessPage from '@/components/PaymentSuccess';

import {callContract} from '@/utils/transaction';
import {getToken, callContractChallenge} from '@/utils/challenge';
import { W3SSdk } from '@circle-fin/w3s-pw-web-sdk'

interface PaymentProps{
    params: { id: string }
}

export default function ConfirmationPayment({params: {id}}: PaymentProps) {
    const [walletType, setWalletType] = useState("");
    const [completed, setCompleted] = useState(false);
  
    const isFormValid = () => {
      return walletType !== "";
    };

    const initiateContractCall = async ()=>{
        console.log("Calling Contract")
        const contractAddress = '0xAc3716c5FE3a5eF3e0Cc0bC8f749905533c73c5d';
        const abiFunctionSignature = 'fulfillPayment(bytes32)';
        //const abiParameters = ['0x7cd3ceedfbec2accc2bcc8cd9f88078e05984f7133711ca156eada8ea9ff2159'];
        const abiParameters = [id];
        const walletId = 'd64b05fb-2b92-5441-9a83-cc91a42e821f';
        
        if(walletType === "user"){
            console.log("Initiating User Challenge");
            const {userToken, encryptionKey} = await getToken('1565e164-d764-4691-a2d4-179e92261970');
            const {challengeId} = await callContractChallenge(userToken, "1565e164-d764-4691-a2d4-179e92261970", contractAddress, abiFunctionSignature, abiParameters);
            console.log("Initiating User Wallet Challenge");
            console.log("User Token:", userToken);
            console.log("Encryption Key:", encryptionKey);
            console.log("Challenge Id:", challengeId);
            const sdk = new W3SSdk();
            sdk.setAppSettings({
                appId: 'd64b05fb-2b92-5441-9a83-cc91a42e821f',
            })
            sdk.execute(challengeId, (error, result) => {
                if (error) {
                  console.log(
                    `${error?.code?.toString() || 'Unknown code'}: ${
                      error?.message ?? 'Error!'
                    }`
                  )
          
                  return
                }
          
                console.log(`Challenge: ${result.type}`)
                console.log(`status: ${result.status}`)
          
                if (result.data) {
                  console.log(`signature: ${result.data?.signature}`)
                  setCompleted(true);
                }
            })
        }else{
            const res = await callContract(walletId, contractAddress, abiFunctionSignature, abiParameters);
            console.log(res);
        }
    }
    const addAllowance = async ()=>{
        console.log("Adding Allowance");
        const amount = '1000000'
        const tokenAddress = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';
        const contractAddress = '0xAc3716c5FE3a5eF3e0Cc0bC8f749905533c73c5d';
        const abiFunctionSignature = 'approve(address, uint256)';
        const abiParameters = [contractAddress, amount];
        const walletId = 'd64b05fb-2b92-5441-9a83-cc91a42e821f';

        if(walletType == "user"){
            console.log("Calling Using User Wallet")
            const {userToken, encryptionKey} = await getToken('1565e164-d764-4691-a2d4-179e92261970');
            const {challengeId} = await callContractChallenge(userToken, "1565e164-d764-4691-a2d4-179e92261970", tokenAddress, abiFunctionSignature, abiParameters);
            console.log("Initiating User Wallet Challenge");
            console.log("User Token:", userToken);
            console.log("Encryption Key:", encryptionKey);
            console.log("Challenge Id:", challengeId);
            
            const sdk = new W3SSdk();
            sdk.setAppSettings({
                appId: 'd64b05fb-2b92-5441-9a83-cc91a42e821f',
            })
            sdk.execute(challengeId, (error, result) => {
                if (error) {
                  console.log(
                    `${error?.code?.toString() || 'Unknown code'}: ${
                      error?.message ?? 'Error!'
                    }`
                  )
          
                  return
                }
          
                console.log(`Challenge: ${result.type}`)
                console.log(`status: ${result.status}`)
          
                if (result.data) {
                  console.log(`signature: ${result.data?.signature}`)
                  setCompleted(true);
                }
            })
        }else{
            const res = await callContract(walletId, tokenAddress, abiFunctionSignature, abiParameters);
            console.log(res);
        }
    }

    const confirmTransaction = async ()=>{
        try{
            await addAllowance();
            await initiateContractCall();
        }catch(e){
            console.error(e);
        }
    }

    const shortenString = id.length > 20 ? `${id.slice(0, 10)}.....${id.slice(-7)}` : id;
  
    return (
      <>
      {completed?
        <SuccessPage id={id}/>
        :
      <>
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
            <option value="user">User Wallet (0x897083eaaeae3abd21a6826bd30c2b79c882412f)</option>
            <option value="developer">EZ-Pay Wallet (0x09842d729e09a7cd1bcdbca22c1310c8cf0503fc)</option>
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
              <span className="font-medium">{shortenString}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Date</span>
              <span className="font-medium">22/09/2024</span>
            </div>
          </div>
  
          {/* Divider */}
          <hr className="my-4 border-gray-200" />
  
          {/* Amount Section */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Amount</span>
            <span className="text-2xl font-bold text-red-500">1 USDC</span>
          </div>
        </div>
  
        {/* Confirm Button */}
        <button
          onClick={async() => {
            confirmTransaction();
            setCompleted(true);
            //window.location.href = "/paymentsuccess"
    }}
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
      </>

    }
    </>
    );
  }
