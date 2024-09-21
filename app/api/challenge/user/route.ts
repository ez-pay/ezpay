import { NextRequest, NextResponse } from 'next/server';
import { initiateUserControlledWalletsClient } from '@circle-fin/user-controlled-wallets';

const apiKey = process.env.API_KEY;

interface UserProps{
    userId: string;
}

export async function POST(req: NextRequest){
    try{
        if(!apiKey){
            return NextResponse.json({error: 'Circle Connection Configuration Error'});
        }
        if (!req.body) {
            return NextResponse.json({ error: 'No data provided' }, {status: 400});
        }
        const tokenRequest: UserProps = await req.json();
        const userId = tokenRequest.userId;

        console.log("Fetching User with id:", userId)

        const circleUserSdk = initiateUserControlledWalletsClient({
            apiKey
        });
        const response = await circleUserSdk.getUser({userId})
        return NextResponse.json(response.data);    
    }catch(e){
        console.log(e);
        return NextResponse.json({ error: 'Unable to fetch wallets' }, {status: 500});
    }
}