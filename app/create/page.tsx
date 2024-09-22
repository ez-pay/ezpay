"use client";
import { W3SSdk } from '@circle-fin/w3s-pw-web-sdk'
import { useCallback, useEffect, useState } from 'react'
import {getToken, createUser, initializeWallet} from "@/utils/challenge";

const appId = process.env.NEXT_PUBLIC_APP_ID;

export default function Create(){
    const [sdk, setSdk]= useState<any>(null);
    const [loadingSdk, setLoadingSdk] = useState(true);
    const [processing, setProcessing] = useState(true);
    const [successful, setSuccessful] = useState(false);
  
    useEffect(() => {
        console.log("App ID:", appId);
        setLoadingSdk(true);
        const newSdk = new W3SSdk();
        setSdk(newSdk);
        setLoadingSdk(false);
    }, [])

    const initializeNewUser = async()=>{
        if(!sdk){throw Error("SDK is not initialized")};
        try{
            const uuid:string = "pls-jalan-anjinggggggggggg";
            const res = await createUser(uuid);
            const {userToken, encryptionKey} = await getToken(uuid);
            const {challengeId} = await initializeWallet(userToken, 'ETH-SEPOLIA');
            // console.log(res);
            // console.log("App ID:", appId);
            // console.log("User Token:", userToken);
            // console.log("Encryption Key:", encryptionKey);
            // console.log("Challenge ID:", challengeId);

            sdk.setAppSettings({
                appId,
              })
            sdk.setAuthentication({
                userToken,
                encryptionKey,
            })
          
            //Optional Code
            sdk.setLocalizations({
                common: {
                  continue: 'Next',
                },
                securityIntros: {
                  headline:
                    'Set up your {{method}} to recover your pin code if you forget it',
                  headline2: 'Security Question',
                },
             })
          
            sdk.setThemeColor({
                backdrop: '#f0f0f0',
                backdropOpacity: 0.5,
                textMain: '#2403fc'
            })
          
            sdk.setResources({
                naviClose:
                  'https://static.vecteezy.com/system/resources/previews/018/887/462/non_2x/signs-close-icon-png.png',
                securityIntroMain:
                    'https://img.freepik.com/premium-vector/cyber-security-illustration-concept-with-characters_269730-111.jpg'
                //'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_auto,q_auto:best/rockcms/2022-01/210602-doge-meme-nft-mb-1715-8afb7e.jpg',
                // fontFamily: {
                //   name: 'Edu TAS Beginner',
                //   url: 'https://fonts.googleapis.com/css2?family=Edu+TAS+Beginner:wght@400;500;600;700&display=swap',
                // },
            })
          
            sdk.setCustomSecurityQuestions(
                [
                  {
                    question: 'What is your favorite color?',
                    type: 'TEXT',
                  },
                  {
                    question: 'What is your favorite food?',
                    type: 'TEXT',
                  },
                  {
                    question: 'When is your birthday?',
                    type: 'DATE',
                  },
                ],
                1
            );
            //Optional Code Ends Here
          
            sdk.execute(challengeId, (error, result) => {
                if (error) {
                  console.log(
                    `${error?.code?.toString() || 'Unknown code'}: ${
                      error?.message ?? 'Error!'
                    }`
                  )
          
                  return
                }
          
                console.log(`Challenge: ${result.type}`)
                console.log(`status: ${result.status}`)
          
                if (result.data) {
                  console.log(`signature: ${result.data?.signature}`)
                }
            })
        }catch(e){
            console.log("Error:", e);
        }
    };
   
   
    return(<>
        <div className="flex justify-center items-center h-screen">
        <button className="bg-blue-600 text-white font-semibold p-4" onClick={initializeNewUser}>Create User</button></div>
    </>)
}