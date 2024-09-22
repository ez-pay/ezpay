// import { NextRequest, NextResponse } from 'next/server';
// import { initiateDeveloperControlledWalletsClient } from'@circle-fin/developer-controlled-wallets';

// const apiKey = process.env.API_KEY;
// const entitySecret = process.env.ENTITY_SECRET;

// interface ContractCallProps{
//     id: string;
//     contractAddress: string;
//     abiFunctionSignature: string;
//     abiParameters: string[];
// }

// export async function POST(req: NextRequest){
//     try{
//         if(!apiKey || !entitySecret){
//             return NextResponse.json({error: 'Circle Connection Configuration Error'});
//         }
//         if (!req.body) {
//             return NextResponse.json({ error: 'No data provided' }, {status: 400});
//         }
//         const walletData: ContractCallProps = await req.json();
//         const walletId = walletData.id;
//         const contractAddress = walletData.contractAddress;
//         const abiFunctionSignature = walletData.abiFunctionSignature;
//         const abiParameters = walletData.abiParameters;

//         console.log("Calling Contract:", contractAddress);
//         console.log("Function Signature:", abiFunctionSignature);
//         console.log("Parameters:", abiParameters);

//         const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
//             apiKey,
//             entitySecret,
//         });
//         const response = await circleDeveloperSdk.createContractExecutionTransaction({
//             walletId,
//             contractAddress,
//             abiFunctionSignature,
//             abiParameters,
//             fee: {
//               type: 'level',
//               config: {
//                 feeLevel: 'MEDIUM'
//               }
//             }
//         });
        
//         // Only display token balance if balance > 0
//         const callResult = response.data;
//         return NextResponse.json(callResult);
//     }catch(e){
//         console.log(e);
//         return NextResponse.json({ error: 'Unable to call smart contract data' }, {status: 500});
//     }
// }