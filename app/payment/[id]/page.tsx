"use client";
import React from 'react';
import PostPayment from '@/components/PostPayment';
import PaymentConfirmation from '@/components/PaymentConfirmation';

import {callContract} from '@/utils/transaction';

export default function Payment(){
    const initiateContractCall = async ()=>{
        const contractAddress = '0xAc3716c5FE3a5eF3e0Cc0bC8f749905533c73c5d';
        const abiFunctionSignature = 'fulfillPayment(bytes32)';
        const abiParameters = ['0x7cd3ceedfbec2accc2bcc8cd9f88078e05984f7133711ca156eada8ea9ff2159'];
        const walletId = 'd64b05fb-2b92-5441-9a83-cc91a42e821f';
        const res = await callContract(walletId, contractAddress, abiFunctionSignature, abiParameters);
        console.log(res);
    }
    const addAllownace = async ()=>{
        const amount = '1000000'
        const tokenAddress = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';
        const contractAddress = '0xAc3716c5FE3a5eF3e0Cc0bC8f749905533c73c5d';
        const abiFunctionSignature = 'approve(address, uint256)';
        const abiParameters = [contractAddress, amount];
        const walletId = 'd64b05fb-2b92-5441-9a83-cc91a42e821f';
        
        const res = await callContract(walletId, tokenAddress, abiFunctionSignature, abiParameters);
        console.log(res);
    }


    const addAllowance = async (amount)=>{
        const tokenAddress = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';
        const contractAddress = '0xa02B0BdD750516D3385368622351860B7d1759dA'; //Polygon Matic
        //const contractAddress = '......';
        const abiFunctionSignature = 'approve(address, uint256)';
        const abiParameters = [contractAddress, amount];
        await initiateContractCall(tokenAddress, abiFunctionSignature, abiParameters);
    }


    return(<>
    <button onClick={addAllownace}>Add Allowance</button>
    <button onClick={initiateContractCall}>Initiate Contract Call</button>
    <PaymentConfirmation/></>)
}