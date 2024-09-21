/** Create a user */
export async function createUser(id: string){
    try{
        const response = await fetch('/api/challenge/create', {
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
        return data;
    }catch(e){
        console.error(e);
    }
}

/** Get a User Token before initializing a challenge */
export async function getToken(id:string){
    try{
        const response = await fetch('/api/challenge/token', {
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
        return data;
    }catch(e){
        console.error(e);
    }
}

/** Create a new Challenge ID to initialize a new user & PIN */
export async function initializeWallet(userToken:string, blockchain:string){
    try{
        const response = await fetch('/api/challenge/initialize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userToken, accountType: 'SCA', blockchains:[blockchain]}),
        });
        if (!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        const data:any = await response.json();
        return data;
    }catch(e){
        console.error(e);
    }
}