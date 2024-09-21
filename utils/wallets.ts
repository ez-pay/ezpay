/** Get the latest wallets in the Circle API */
export async function getWallets(){
    try{
        const response = await fetch('/api/users');       
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data:any = await response.json();
        //console.log(data);
        return data.walletInfo.wallets;
    }catch(e){
        console.error('Error:', e);
    }
}

/**Get the individual information of a wallet */
export async function getIndividualWallet(id: string){
    try{
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        });
        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        const data:any = await response.json();
        const wallet = data.wallet
        return wallet;
    }catch(e){
        console.error('Error:', e);
    }
}

/** Get the token balances of a Wallet */
export async function getBalances(id: string){
    try{
        const response = await fetch('/api/users/balance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        });
        if (!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        const data:any = await response.json();
        return data.balances.tokenBalances;
    }catch(e){
        console.error('Error:', e);
    }
}

/** Get the latest transactions of a Wallet */
export async function getTransactions(id: string){
    try{
        const response = await fetch('/api/users/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        });
        if (!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        const transactions = data.transactions;
        //console.log(data);
        return transactions;
    }catch(e){
        console.error('Error:', e);
    }
}

/** Edit the Name of a Wallet */
export async function editWallet(id:string, name:string, refId:string){
    try{
        const response = await fetch('/api/users/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id, name, refId}),
        });
        if (!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        const result:any = await response.json();
        console.log("Result:", result);
        return result;
    }catch(e){
        console.error('Error:', e);
    }
}

/** Create a new Wallet */
export async function createWallet(walletSetId: any, blockchains: any[], accountType: any){
    console.log("Creating New Wallet")
    try{
        const response = await fetch('/api/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({walletSetId, blockchains, accountType}),
        });
        if (!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        const result:any = await response.json();
        console.log("Result:", result.wallets);
        return result.wallets;
    }catch(e){
        console.error('Error:', e);
    }
}
