"use client";
import Image from "next/image";
import Link from 'next/link'
import {useState, useEffect} from "react";
import {getWallets, createWallet} from "@/utils/wallets";
import {getToken, getUserWallets} from "@/utils/challenge";

export default function Home() {
  const [wallets, setWallets]: any[] = useState([]);
  const [balances, setBalances]:any[] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const defaultId = '1565e164-d764-4691-a2d4-179e92261970';

  async function getWallet() {
    setIsLoading(true);
    try{
      const wallets = await getWallets();
      setWallets(wallets);
      console.log(wallets);
    }catch(e){
      console.log(e)
    }
    setIsLoading(false);
  }

  async function fetchUserWallets(){
    try{
      const {encryptionKey, userToken} = await getToken(defaultId);
      console.log("Token:", userToken);
      const userWallets = await getUserWallets(userToken);
      console.log("User Controlled Wallets:", userWallets);
    }catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{
    getWallet()
    fetchUserWallets();
  }, []);

  const create= async ()=>{
    console.log("Creating New Wallet");
    const res = await createWallet("16536b99-6421-5d25-b7be-ed4cebf706f8", ['ETH-SEPOLIA'], "SCA");
    console.log("Result:", res);
  };
  
  return (
    <>
      <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <button onClick={create}>Create Wallet</button>
        <div>Hello Motherfucker</div>

        {isLoading? 
          <div>Loading</div>
          : 
          wallets.length > 0 ? 
            <>
              <div>Length: {wallets.length}</div>
              {wallets.map((item:any, key:number)=>
                <div key={key}>
                  <Link href={`/wallet/${item.id}`}>
                    <div>Wallet Circle ID: {item.id}</div>
                    <div>Wallet Address: {item.address}</div>
                    <div>Blockchain: {item.blockchain}</div>
                    <div>Wallet State: {item.state}</div>
                    <div>Wallet Set ID: {item.walletSetId}</div>
                    <div>Custody Type: {item.custodyType}</div>
                    <div>Account Type: {item.accountType}</div>
                    <div>Last update Date: {item.updateDate}</div>
                    <div>Create Date: {item.createDate}</div>
                    {item.name? 
                      <>
                      <div>.</div>
                      <div className="text-red-400">Wallet Name:{item.name}</div>
                      <div className="text-red-400">Wallet Ref Id: {item.refId}</div>
                      <div>.</div>
                      </>:""}
                    {/*<div>{JSON.stringify(item)}</div>*/}
                  </Link>
                </div>
              )}
            </>
            :<div>No Wallet Detected: {wallets.length}</div>
        }
      </div>
    </>
  );
}
