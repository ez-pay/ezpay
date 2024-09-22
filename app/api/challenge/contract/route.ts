import { NextRequest, NextResponse } from 'next/server';
import { initiateUserControlledWalletsClient, AccountType, Blockchain } from '@circle-fin/user-controlled-wallets';

const apiKey = process.env.API_KEY;

export async function POST(req: NextRequest){
    try{
        if(!apiKey){
            return NextResponse.json({error: 'Circle Connection Configuration Error'});
        }
        if (!req.body) {
            return NextResponse.json({ error: 'No data provided' }, {status: 400});
        }
        const initializeWallet: any = await req.json();
        console.log(initializeWallet);
        const walletId = initializeWallet.walletId;
        const userToken = initializeWallet.userToken;
        const contractAddress = initializeWallet.contractAddress;
        const abiFunctionSignature = initializeWallet.abiFunctionSignature;
        const abiParameters = initializeWallet.abiParameters;

        const circleUserSdk = initiateUserControlledWalletsClient({
            apiKey
        });
        const response = await circleUserSdk.createUserTransactionContractExecutionChallenge({
            userToken,
            walletId,
            contractAddress,
            abiFunctionSignature,
            abiParameters,
            fee: {
              type: 'level',
              config: {
                feeLevel: 'MEDIUM'
              }
            }
        });    
        return NextResponse.json(response.data);    
    }catch(e){
        console.log(e);
        return NextResponse.json({ error: 'Unable to fetch wallets' }, {status: 500});
    }
}