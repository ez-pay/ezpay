/** Function to initiliaze a transfer from one wallet to another */
export async function transfer(walletId, tokenId, destinationAddress, amounts){
    try{ 
        const txData = {
            walletId,
            tokenId,
            destinationAddress,
            amounts,
        }

        const response = await fetch('/api/transaction/transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(txData),
        });
        const transferResult = await response.json();
        return transferResult;
    }catch(e){
        console.error('Error:', e);
    }
}

/** Function to get the information of a transaction */
export async function getTransaction(txId:string){
    try{
        const response = await fetch(`/api/transaction`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: txId})
        });
        const txData = await response.json();
        return txData.transaction;
    }catch(e){
        console.error('Error:', e);
    }
}

/** Function to call a Smart Contract */
export async function callContract(id, contractAddress, abiFunctionSignature, abiParameters){
    try{
        const callData = {id, contractAddress, abiFunctionSignature, abiParameters};
        console.log("Call Data:", callData);
        
        const response = await fetch('/api/transaction/contract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(callData),
        });
        const data = await response.json();
        return data;
    }catch(e){
        console.error('Error:', e);
    }
}

export async function deployContract(id){
    try{
        const response = await fetch('/api/transaction/deployContract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        });
        const data = await response.json();
        console.log(data);
        return data;
    }catch(e){
        console.error('Error:', e);
    }
}