import { NextRequest, NextResponse } from 'next/server';
import { initiateUserControlledWalletsClient } from '@circle-fin/user-controlled-wallets';

const apiKey = process.env.API_KEY;

interface TokenRequestProps{
    id: string;
}

export async function POST(req: NextRequest){
    try{
        if(!apiKey){
            return NextResponse.json({error: 'Circle Connection Configuration Error'});
        }
        if (!req.body) {
            return NextResponse.json({ error: 'No data provided' }, {status: 400});
        }
        const tokenRequest: TokenRequestProps = await req.json();
        const userId = tokenRequest.id;

        const circleUserSdk = initiateUserControlledWalletsClient({
            apiKey
        });
        const response = await circleUserSdk.createUserToken({
            userId,
        });        
        return NextResponse.json(response.data);    
    }catch(e){
        console.log(e);
        return NextResponse.json({ error: 'Unable to fetch wallets' }, {status: 500});
    }
}