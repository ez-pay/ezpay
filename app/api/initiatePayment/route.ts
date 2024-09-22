import { NextRequest, NextResponse } from 'next/server';
import { initiateDeveloperControlledWalletsClient } from'@circle-fin/developer-controlled-wallets';

const apiKey = process.env.API_KEY;
const entitySecret = process.env.ENTITY_SECRET;

interface PaymentInitProps{
    id: string;
    amount: string;
    //authenticationKey: string;  //TO BE IMPLEMENTED
}

export async function POST(req: NextRequest){
    try{
        if(!apiKey || !entitySecret){
            return NextResponse.json({error: 'Circle Connection Configuration Error'});
        }
        if (!req.body) {
            return NextResponse.json({ error: 'No data provided' }, {status: 400});
        }
        const paymentData: PaymentInitProps = await req.json();
        const walletId = paymentData.id;
        const amount = paymentData.amount;

        const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
            apiKey,
            entitySecret,
        });
        const response = await circleDeveloperSdk.createContractExecutionTransaction({
            walletId,
            contractAddress: "0xAc3716c5FE3a5eF3e0Cc0bC8f749905533c73c5d",
            abiFunctionSignature: "requestPayment(uint256)",
            abiParameters: [amount],
            fee: {
              type: 'level',
              config: {
                feeLevel: 'MEDIUM'
              }
            }
        });
        const callResult = response.data;
        return NextResponse.json(callResult);
    }catch(e){
        console.log(e);
        return NextResponse.json({ error: 'Unable to call smart contract data' }, {status: 500});
    }
}