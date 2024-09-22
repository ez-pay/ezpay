"use client";
import { W3SSdk } from '@circle-fin/w3s-pw-web-sdk'
import { useCallback, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {getToken, createUser, initializeWallet, callContractChallenge} from "@/utils/challenge";

const appId = process.env.NEXT_PUBLIC_APP_ID;

export default function Home(){
    const [sdk, setSdk]= useState<any>(null);
    const [loadingSdk, setLoadingSdk] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [successful, setSuccessful] = useState(false);
  
    const callAPI = async ()=>{
        const walletId = "86eefc17-11d7-59f6-ba28-d42563e5933f";
        //const walletId = '1565e164-d764-4691-a2d4-179e92261970';
        const {userToken, encryptionKey} = await getToken(walletId);
        const contractAddress = "0xAc3716c5FE3a5eF3e0Cc0bC8f749905533c73c5d";
        const abiFunctionSignature = "requestPayment(uint256)"
        const abiParameters = ['1000000'];
        const res = callContractChallenge(userToken, walletId, contractAddress, abiFunctionSignature, abiParameters);

        console.log(res);        
    }

    return(<>
        <div className="flex flex-col justify-center items-center h-screen">
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold p-4" onClick={successful? () => window.location.href = "/homepage" : ()=>{callAPI()}}>{successful? "Open Dashboard" :"Create Payment"}</button>
        </div>
    </>)
}