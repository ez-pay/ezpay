import { NextRequest, NextResponse } from 'next/server';
import { initiateDeveloperControlledWalletsClient } from'@circle-fin/developer-controlled-wallets';

const apiKey = process.env.API_KEY;
const entitySecret = process.env.ENTITY_SECRET;

interface TxProps{
    id:string;
}

// export async function GET(req:NextRequest){
//     try{
//         if(!apiKey || !entitySecret){
//             return NextResponse.json({error: 'Circle Connection Configuration Error'});
//         }
//         const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
//             apiKey,
//             entitySecret,
//         });
//         // Can specify how many latest wallets to get (1-50)
//         const res:any = await circleDeveloperSdk.listWallets({pageSize:30});
//         const walletInfo = res.data;
//         //console.log(walletInfo);
//         return NextResponse.json({walletInfo})
//     }catch(e){
//         console.log(e);
//         return NextResponse.json({ error: 'Unable to fetch wallets' }, {status: 500});
//     }
// }

export async function POST(req:NextRequest){
    try{
        if(!apiKey || !entitySecret){
            return NextResponse.json({error: 'Circle Connection Configuration Error'});
        }
        if (!req.body) {
            return NextResponse.json({ error: 'No data provided' }, {status: 400});
        }
        const txInfo: TxProps = await req.json();
        const txId = txInfo.id;

        const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
            apiKey,
            entitySecret,
        });
        const res = await circleDeveloperSdk.getTransaction({id: txId})
        const txData = res.data
        return NextResponse.json(txData);        
    }catch(e){
        console.log(e);
        return NextResponse.json({ error: 'Unable to fetch transactions' }, {status: 500});
    }

}
