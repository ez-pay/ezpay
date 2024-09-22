import { ethers } from "ethers";
import { useReadContract } from 'wagmi';
import abi from './abi.json';

export default async function readContract() {
    console.log("Reading Contract")
    const result = await useReadContract({
        abi,
        address: '0xAc3716c5FE3a5eF3e0Cc0bC8f749905533c73c5d',
        functionName: 'getPaymentDetails',
        args: ['0x7cd3ceedfbec2accc2bcc8cd9f88078e05984f7133711ca156eada8ea9ff2159'],
    });
    console.log("Done")
    return result;
    
    // Connect to an Ethereum RPC provider (e.g., Infura or a public node)
    // const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/537ad090709944f8ad6e4bbfc0177eba");

    // // Address of the smart contract
    // const contractAddress = "0xAc3716c5FE3a5eF3e0Cc0bC8f749905533c73c5d";

    // // ABI of the smart contract, with only the function you want to call
    // const abi = [
    // "function getPaymentDetails(bytes32 _paymentId) external view returns (address, uint256, bool)"
    // ];

    // // Create a contract instance
    // const contract = new ethers.Contract(contractAddress, abi, provider);

    // async function callViewFunction() {
    // try {
    //     const result = await contract.yourViewFunction();
    //     console.log("View function result:", result);
    // } catch (error) {
    //     console.error("Error calling view function:", error);
    // }
    // }

    // callViewFunction();
}