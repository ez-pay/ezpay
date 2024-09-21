import { NextRequest, NextResponse } from 'next/server';
import { initiateDeveloperControlledWalletsClient } from'@circle-fin/developer-controlled-wallets';

const apiKey = process.env.API_KEY;
const entitySecret = process.env.ENTITY_SECRET;

interface WalletCreateProps{
    walletSetId: any;
    blockchains: any[];
    accountType: any;
}

/** This function creates a new wallet*/
export async function POST(req:NextRequest){
    console.log("Creating New Wallet")
    try{
        if(!apiKey || !entitySecret){
            return NextResponse.json({error: 'Circle Connection Configuration Error'});
        }
        if (!req.body) {
            return NextResponse.json({ error: 'No data provided' }, {status: 400});
        }
        const walletData: WalletCreateProps = await req.json();
        //console.log(walletData);
        const accountType: any = walletData.accountType;
        const blockchains: any[] = walletData.blockchains;
        const walletSetId: any = walletData.walletSetId;
        
        const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
            apiKey,
            entitySecret,
        });
        const result = await circleDeveloperSdk.createWallets({
            accountType,
            blockchains,
            count: 1,
            walletSetId,
        });

        //console.log("Wallet Successfully Created")
        return NextResponse.json(result.data);
    }catch(e){
        console.log(e);
        return NextResponse.json({ error: 'Unable to fetch wallets' }, {status: 500});
    }
}