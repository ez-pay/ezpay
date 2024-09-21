import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.API_KEY;
const entitySecret = process.env.ENTITY_SECRET;

const { initiateDeveloperControlledWalletsClient } = require('@circle-fin/developer-controlled-wallets');

interface TxProps{
    walletId: string;
    tokenId: string;
    destinationAddress: string;
    amounts: string;
}

export async function POST(req: NextRequest){
    try{
        if(!apiKey || !entitySecret){
            return NextResponse.json({error: 'Circle Connection Configuration Error'});
        }
        if (!req.body) {
            return NextResponse.json({ error: 'No data provided' }, {status: 400});
        }
        const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
            apiKey,
            entitySecret,
        });

        const txData: TxProps = await req.json();
        console.log("Transaction data:", txData);
        const walletId = txData.walletId;
        const tokenId = txData.tokenId;
        const destinationAddress = txData.destinationAddress;
        const amounts = [txData.amounts]; // don't forget the data type is list
        console.log(walletId);
        console.log(tokenId);
        console.log(destinationAddress);
        console.log(amounts);

        const txRes = await circleDeveloperSdk.createTransaction({
            walletId,
            tokenId,
            destinationAddress,
            amounts,
            fee: {
              type: 'level',
              config: {
                feeLevel: 'MEDIUM'
              }
            }
        });
        return NextResponse.json(txRes.data)
    }catch(e){
        console.log(e);
        return NextResponse.json({ error: 'Unable to fetch wallets' }, {status: 500});
    }
}