"use client";
import {useState, useEffect} from "react";
import {getBalances, getIndividualWallet, editWallet, getTransactions} from "@/utils/wallets";
import { useRouter } from 'next/navigation';

import {getTransaction, transfer, callContract, deployContract} from "@/utils/transaction";
import {getToken} from "@/utils/challenge";

interface WalletPageProps{
    params: { id: string }
};

/**
 * This page displays the details of individual wallets
 * ID is the Circle-ID of the Developer-Controlled Wallet */
export default function Wallet({params: {id}}: WalletPageProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [loadingWallet, setLoadingWallet] = useState(true);
    const [balances, setBalances]:any[] = useState([]);
    const [wallet, setWallet]:any[] = useState([]);
 
    const [walletName, setWalletName] = useState("");
    const [refId, setRefId] = useState("");
    const [txId, setTxId] = useState("");

    // Get Balance through API Call
    const getBalance = async (id: string) => {
        setIsLoading(true);
        try{
            const tokenBalances = await getBalances(id);            
            console.log("Wallet Id:", id);
            console.log("Balances:", tokenBalances);
            setBalances(tokenBalances)
        }catch(e){
            console.log(e);
        }
        setIsLoading(false);
    }

    const fetchTransactions = async (id: string) => {
        try{
            const transactions = await getTransactions(id);
            console.log("Transactions:", transactions);
        }catch(e){
            console.log(e);
        }
    }

    const getWalletInfo = async(id:string)=>{
        setLoadingWallet(true);
        try{
            const walletInfo = await getIndividualWallet(id);
            setWallet(walletInfo);
            console.log("Wallet Information:", walletInfo);
        }catch(e){
            console.log(e);
        }
        setLoadingWallet(false);
    }

    // Get wallet balance when page is loaded
    useEffect(()=>{
        getBalance(id);
        fetchTransactions(id);
        getWalletInfo(id);
    }, [])

    // This thing is not working yet
    async function addData(){
        try{
            const res = await editWallet(id, walletName, "UUID1");
            console.log("Response:", res);
            router.push("/");
        }catch(e){
            console.log(e);
        }
    }

    // To Remove:
    const fetchTransaction = async ()=>{
        try{
            const res = await getTransaction(txId);
            console.log("Transaction:", res);
        }catch(e){
            console.log(e);
        }
    }
    const initializeTransfer = async ()=>{
        if(wallet){
            const walletId = wallet.id;
            const tokenId = '36b6931a-873a-56a8-8a27-b706b17104ee';
            const destinationAddress = '0x6a41b8f346757fe7bf1005af0881c41646f0f2f8';
            const amounts = '.3';
            
            const res = await transfer(walletId, tokenId, destinationAddress, amounts);
            console.log(res);
        }else{
            alert("Wallet Not Found");
        }
    }

    const initiateContractCall = async (contractAddress:string, abiFunctionSignature:string, abiParameters)=>{
        if(wallet){
            const walletId = wallet.id;
            const res = await callContract(walletId, contractAddress, abiFunctionSignature, abiParameters);
            console.log(res);
        }else{
            alert("Wallet Not Found");
        }
    }

    const addAllowance = async (amount)=>{
        const tokenAddress = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';
        const contractAddress = '0xa02B0BdD750516D3385368622351860B7d1759dA'; //Polygon Matic
        //const contractAddress = '......';
        const abiFunctionSignature = 'approve(address, uint256)';
        const abiParameters = [contractAddress, amount];
        await initiateContractCall(tokenAddress, abiFunctionSignature, abiParameters);
    }

    const depositToken = async()=>{
        const contractAddress = '0xa02B0BdD750516D3385368622351860B7d1759dA';
        const abiFunctionSignature = 'fulfillPayment(bytes32)';
        const abiParameters = ['0x7894c68f898a55a1a8b6469dc1505b70a28c3a4121e541167e24d67400d4ee10'];
        await initiateContractCall(contractAddress, abiFunctionSignature, abiParameters);
    }   

    const initiateDeployContract = async ()=>{
        if(wallet){
            const res = await deployContract(wallet.id);
            console.log(res);
        }else{
            alert("Wallet Not Found");
        }
    }

    const createUserToken = async ()=>{
        const{challengeId, encryptionKey} = getToken('1565e164-d764-4691-a2d4-179e92261970');
    };

    // Event to change the name of the wallet
    const changeName = (event)=>{setWalletName(event.target.value)}
    const changeRefId = (event)=>{setRefId(event.target.value)}
    const changeTxId = (event)=>{setTxId(event.target.value)}
    
    return(
    <>
        <div>Wallet ID: {id}</div>
        <div>.</div>
        {loadingWallet?
            <><div>Wallet Not Found</div><div>.</div></>:
            <div>
                <div>Wallet Circle ID: {wallet.id}</div>
                <div>Wallet Address: {wallet.address}</div>
                <div>Blockchain: {wallet.blockchain}</div>
                <div>Wallet State: {wallet.state}</div>
                <div>Wallet Set ID: {wallet.walletSetId}</div>
                <div>Custody Type: {wallet.custodyType}</div>
                <div>Account Type: {wallet.accountType}</div>
                <div>Last update Date: {wallet.updateDate}</div>
                <div>Create Date: {wallet.createDate}</div>
                {wallet.name? 
                    <>
                    <div>.</div>
                    <div className="text-red-400">Wallet Name:{wallet.name}</div>
                    <div className="text-red-400">Wallet Ref Id: {wallet.refId}</div>
                    <div>.</div>
                    </>:""}
                {/*<div>{JSON.stringify(item)}</div>*/}
            </div>
        }
        {isLoading? 
            "Loading" : 
            balances.length > 0?
                balances.map((item:any, key:number)=>{
                const token = item.token;
                return <div key={key}>
                    <div>Token Id: {token.id}</div>
                    <div>Blockchain: {token.blockchain}</div>
                    <div>Native Token: {token.isNative? "True":"False"}</div>
                    <div>Token Name: {token.name}</div>
                    <div>Token Symbol: {token.symbol}</div>
                    {token.isNative? 
                    "": <>
                        <div>Token Address: {token.tokenAddress}</div>
                        <div>Token Standard: {token.standard}</div>
                        </>}
                    <div>Holded Token: {item.amount}</div>
                    <div>Decimals: {token.decimals}</div>
                    <div> . </div>
                    {/*JSON.stringify(item)*/}
                </div>
            })
            : <><div>No Balances Detected</div><div>.</div></>
        }
        <div>
        <input 
            type="text" 
            value={walletName} 
            onChange={changeName} 
            placeholder="Type wallet name:"
            style={{ padding: '8px', fontSize: '16px', color: 'white', background:'black' }} 
        />
        </div>
        <div>
            <input 
                type="text" 
                value={refId} 
                onChange={changeRefId} 
                placeholder="Type wallet refId:"
                style={{ padding: '8px', fontSize: '16px', color: 'white', background:'black' }} 
            />
        </div>

        <button onClick={addData}>Edit Wallet</button>
        <div>.</div>
        <input 
            type="text" 
            value={txId} 
            onChange={changeTxId} 
            placeholder="Type Transcation Id:"
            style={{ padding: '8px', fontSize: '16px', color: 'white', background:'black' }} 
        />
        <div>
            <button onClick={fetchTransaction}>Fetch Transaction</button>
        </div>
        <div>.</div>
        <div>
            <button onClick={initializeTransfer}>Transfer</button>
        </div>
        <div>.</div>
        <div>
            <button onClick={()=>{addAllowance('1000000')}}>Add Allowance</button>
        </div>
        <div>.</div>
        <div>
            <button onClick={()=>{depositToken()}}>Make Payment</button>
        </div>
        <div>.</div>
        <div>
            <button onClick={initiateDeployContract}>Deploy Contract</button>
        </div>
        <div>.</div>
        <div>
            <button onClick={createUserToken}>Create User Token</button>
        </div>
    </>);
}