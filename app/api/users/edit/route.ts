import { NextRequest, NextResponse } from 'next/server';
import { initiateDeveloperControlledWalletsClient } from'@circle-fin/developer-controlled-wallets';

const apiKey = process.env.API_KEY;
const entitySecret = process.env.ENTITY_SECRET;

interface WalletEditProps{
    id: string;
    name: string;
    refId: string;
}

/** This function is to EDIT each wallet's user information (name & refId) */
export async function POST(req:NextRequest){
    console.log("Editing Data")
    try{
        if(!apiKey || !entitySecret){
            return NextResponse.json({error: 'Circle Connection Configuration Error'});
        }
        if (!req.body) {
            return NextResponse.json({ error: 'No data provided' }, {status: 400});
        }
        const walletData: WalletEditProps = await req.json();
        console.log(walletData);
        const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
            apiKey,
            entitySecret,
        });
        const id:string = walletData.id;
        const name:string = walletData.name;
        const refId:string = walletData.refId;
        const result = await circleDeveloperSdk.updateWallet({
            id,
            name,
            refId,
        });
        return NextResponse.json(result.data);
    }catch(e){
        console.log(e);
        return NextResponse.json({ error: 'Unable to fetch wallets' }, {status: 500});
    }
}