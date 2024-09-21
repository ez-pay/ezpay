import { NextRequest, NextResponse } from 'next/server';
import { initiateDeveloperControlledWalletsClient } from'@circle-fin/developer-controlled-wallets';

const apiKey = process.env.API_KEY;
const entitySecret = process.env.ENTITY_SECRET;

interface WalletDataProps{
    id: string;
}

export async function POST(req: NextRequest){
    console.log("Searching for Balances");
    try{
        if(!apiKey || !entitySecret){
            return NextResponse.json({error: 'Circle Connection Configuration Error'});
        }
        if (!req.body) {
            return NextResponse.json({ error: 'No data provided' }, {status: 400});
        }
        const walletData: WalletDataProps = await req.json();
        const walletId = walletData.id;

        const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
            apiKey,
            entitySecret,
        });
        const balance:any = await circleDeveloperSdk.getWalletTokenBalance({
            id: walletId,
        });
        //console.log(balance.data)
        // Only display token balance if balance > 0
        const balances:any[] = balance.data;
        return NextResponse.json({balances});
    }catch(e){
        console.log(e);
        return NextResponse.json({ error: 'Unable to fetch wallet balance' }, {status: 500});
    }
}