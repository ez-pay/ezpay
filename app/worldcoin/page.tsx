"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IDKitWidget, VerificationLevel, ISuccessResult } from "@worldcoin/idkit";
import { logVerification } from "./actions/verify";
import { ethers } from 'ethers';

export default function Home() {
  const [address, setAddress] = useState('');
  const [verificationResult, setVerificationResult] = useState<string | null>(null);
  const router = useRouter();

  const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as 'app_${string}';
  const action = process.env.NEXT_PUBLIC_WLD_ACTION;
 
//   if (!app_id) throw new Error("app_id is not set in environment variables!");
//   if (!action) throw new Error("action is not set in environment variables!");

  // Automatically get the wallet address on component mount
  useEffect(() => {
    const fetchWalletAddress = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const userAddress = await signer.getAddress();
          setAddress(userAddress);
        } catch (error) {
          console.error("Error fetching wallet address:", error);
        }
      } else {
        console.error("Ethereum provider is not available.");
      }
    };

    fetchWalletAddress();
  }, []);

  const handleVerify = async (result: ISuccessResult) => {
    if (!address) {
      alert("No wallet address found.");
      return;
    }

    try {
      const logResult = await logVerification(address, result);
      setVerificationResult(logResult.message);
      console.log("Log result:", logResult);

      if (logResult.success && logResult.verificationSuccess) {
        // Redirect to another page after successful verification
        router.push('/success'); // Replace '/success' with your desired route
      }
    } catch (error) {
      console.error("Error during logging:", error);
      setVerificationResult("Error occurred during logging");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">World ID Verification</h1>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <p className="mb-4">Your wallet address: {address}</p>
      </div>

      <div>
        <IDKitWidget
          app_id={app_id}
          action="verification"
          onSuccess={handleVerify}
          handleVerify={handleVerify}
          verification_level={VerificationLevel.Orb}
        >
          {({ open }) => (
            <button onClick={open} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Verify with World ID
            </button>
          )}
        </IDKitWidget>
        {verificationResult && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            Result: {verificationResult}
          </div>
        )}
      </div>
    </main>
  );
}