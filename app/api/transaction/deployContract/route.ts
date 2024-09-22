import { NextRequest, NextResponse } from 'next/server';
import { initiateDeveloperControlledWalletsClient } from'@circle-fin/developer-controlled-wallets';
import { initiateSmartContractPlatformClient, DeployContractInput } from '@circle-fin/smart-contract-platform';

const apiKey = process.env.API_KEY;
const entitySecret = process.env.ENTITY_SECRET;

interface ContractDeployProps{
    id: string;
}

async function generateCipher(){
    if(!apiKey || !entitySecret){
        throw new Error('Circle Connection Configuration Error');
    }
    const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
        apiKey,
        entitySecret,
    });

    const response:any = await circleDeveloperSdk.getPublicKey();  
    const key = response.data.publicKey;

    // Generate the Entity Secret Ciphertext
    const forge = require('node-forge')
    const hexEntitySecret = forge.util.hexToBytes(entitySecret)
    const publicKey = forge.pki.publicKeyFromPem(key)
    const encryptedData = publicKey.encrypt(entitySecret, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: {
            md: forge.md.sha256.create(),
        },
    })
    return(forge.util.encode64(encryptedData))
}

export async function POST(req: NextRequest){
    try{
        if(!apiKey || !entitySecret){
            return NextResponse.json({error: 'Circle Connection Configuration Error'});
        }
        if (!req.body) {
            return NextResponse.json({ error: 'No data provided' }, {status: 400});
        }
        const walletData: ContractDeployProps = await req.json();
        const walletId = walletData.id;
        console.log("Deploying Contract using Wallet:", walletId);
        const name= 'Example Contract Name';
        const description= 'Example Contract Description';
        const blockchain = 'MATIC-AMOY';
        const entitySecretCiphertext:string = await generateCipher();
        console.log("Entity Secret Ciphertext:", entitySecretCiphertext);
        const bytecode = "608060405234801561000f575f80fd5b5060405161095c38038061095c833981810160405281019061003191906100d4565b805f806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506100ff565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6100a38261007a565b9050919050565b6100b381610099565b81146100bd575f80fd5b50565b5f815190506100ce816100aa565b92915050565b5f602082840312156100e9576100e8610076565b5b5f6100f6848285016100c0565b91505092915050565b6108508061010c5f395ff3fe608060405234801561000f575f80fd5b5060043610610055575f3560e01c80635145cbc014610059578063adc9772e14610077578063dd49756e14610093578063eb5a662e146100af578063f8b2cb4f146100df575b5f80fd5b61006161010f565b60405161006e9190610523565b60405180910390f35b610091600480360381019061008c91906105c4565b6101ad565b005b6100ad60048036038101906100a89190610602565b61024c565b005b6100c960048036038101906100c4919061062d565b6103c9565b6040516100d69190610523565b60405180910390f35b6100f960048036038101906100f4919061062d565b61046b565b6040516101069190610523565b60405180910390f35b5f805f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016101699190610667565b602060405180830381865afa158015610184573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906101a89190610694565b905090565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb83836040518363ffffffff1660e01b81526004016102079291906106bf565b6020604051808303815f875af1158015610223573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610247919061071b565b505050565b80805f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e33306040518363ffffffff1660e01b81526004016102a8929190610746565b602060405180830381865afa1580156102c3573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906102e79190610694565b1015610328576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161031f906107c7565b60405180910390fd5b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff1660e01b8152600401610384939291906107e5565b6020604051808303815f875af11580156103a0573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906103c4919061071b565b505050565b5f805f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e83306040518363ffffffff1660e01b8152600401610425929190610746565b602060405180830381865afa158015610440573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906104649190610694565b9050919050565b5f805f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231836040518263ffffffff1660e01b81526004016104c59190610667565b602060405180830381865afa1580156104e0573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906105049190610694565b9050919050565b5f819050919050565b61051d8161050b565b82525050565b5f6020820190506105365f830184610514565b92915050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61056982610540565b9050919050565b6105798161055f565b8114610583575f80fd5b50565b5f8135905061059481610570565b92915050565b6105a38161050b565b81146105ad575f80fd5b50565b5f813590506105be8161059a565b92915050565b5f80604083850312156105da576105d961053c565b5b5f6105e785828601610586565b92505060206105f8858286016105b0565b9150509250929050565b5f602082840312156106175761061661053c565b5b5f610624848285016105b0565b91505092915050565b5f602082840312156106425761064161053c565b5b5f61064f84828501610586565b91505092915050565b6106618161055f565b82525050565b5f60208201905061067a5f830184610658565b92915050565b5f8151905061068e8161059a565b92915050565b5f602082840312156106a9576106a861053c565b5b5f6106b684828501610680565b91505092915050565b5f6040820190506106d25f830185610658565b6106df6020830184610514565b9392505050565b5f8115159050919050565b6106fa816106e6565b8114610704575f80fd5b50565b5f81519050610715816106f1565b92915050565b5f602082840312156107305761072f61053c565b5b5f61073d84828501610707565b91505092915050565b5f6040820190506107595f830185610658565b6107666020830184610658565b9392505050565b5f82825260208201905092915050565b7f416c6c6f77616e6365204572726f7200000000000000000000000000000000005f82015250565b5f6107b1600f8361076d565b91506107bc8261077d565b602082019050919050565b5f6020820190508181035f8301526107de816107a5565b9050919050565b5f6060820190506107f85f830186610658565b6108056020830185610658565b6108126040830184610514565b94935050505056fea2646970667358221220da2d110ffc69b043680eba4bbd9c3372763e7be9562db4822a08631f394eaf2b64736f6c634300081a0033";
        const abiJson = JSON.stringify([
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "token",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                    }
                ],
                "name": "depositTokens",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_account",
                        "type": "address"
                    }
                ],
                "name": "getAllowance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_account",
                        "type": "address"
                    }
                ],
                "name": "getBalance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getSmartContractBalance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "stake",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ]);

        console.log("ABI:", abiJson);

        const circleContractSdk = initiateSmartContractPlatformClient({
            apiKey,
            entitySecret,
        });

        const deployment = await circleContractSdk.deployContract({
            name: "Hello ",
            description: "Description",
            walletId ,
            blockchain: 'MATIC-AMOY',
            fee: {
              type: 'level',
              config: {
                feeLevel: 'MEDIUM'
              }
            },
            constructorParameters: ['0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582'], //no parameters
            //entitySecretCiphertext: entitySecretCiphertext,
            abiJson,
            bytecode,
          });
          console.log(deployment.data);
        
        // Only display token balance if balance > 0
        const callResult = deployment.data;
        return NextResponse.json(callResult);
    }catch(e){
        console.log(e);
        return NextResponse.json({ error: 'Unable to deploy smart contract'}, {status: 500});
    }
}