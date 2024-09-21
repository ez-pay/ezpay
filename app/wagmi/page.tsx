import { useReadContract } from 'wagmi'
import wagmiContractConfig from '@/wagmi.config'
import React from 'react'
export default function Wagmi(){

    // // Address of the smart contract
    // const contractAddress = "0xAc3716c5FE3a5eF3e0Cc0bC8f749905533c73c5d";
    // const abi = [
    // "function getPaymentDetails(bytes32 _paymentId) external view returns (address, uint256, bool)"
    // ];
    // const _paymentId = 0x7cd3ceedfbec2accc2bcc8cd9f88078e05984f7133711ca156eada8ea9ff2159


    

    function ReadContract() {
        const { data: receiver,amount, completed } = useReadContract({
            ...wagmiContractConfig,
            functionName: 'getPaymentDetails',
            args: ['0x7cd3ceedfbec2accc2bcc8cd9f88078e05984f7133711ca156eada8ea9ff2159'],
        })

        return (
            <><div>Receiver: {receiver?.toString()}</div><div>Amount: {amount?.toString()}</div><div>Completed: {completed?.toString()}</div></>
        )
    }


    // wagmi.config.ts
    // export default {
    //     out: 'src/generated.ts', //Path to output generated code.
    //     contracts: [
    //     {
    //         abi: [contract abi],
    //         address: 'contract address',
    //         name: 'name of contract ',
    //     }
    //     ],
    // }


    return(<>
        <div>Helo</div>
    </>)
}