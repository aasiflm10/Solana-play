import { SOLANA_DEVNET } from "@/config";
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { AlphaWalletAdapter } from "@solana/wallet-adapter-wallets";
import axios from "axios";

export function AirDrop() {
    const wallet = useWallet();
    const {connection} = useConnection();

    async function  airdropSol() {

        if(!wallet.publicKey)
        {
            alert("Connect Wallet first");
            return;
        }
        
        const input = (document.getElementById("amount") as HTMLInputElement).value ;
        const amount = parseFloat(input);
        console.log("Amount entered" + amount)
        const resp = await connection.requestAirdrop(wallet.publicKey, 1e9 * amount);
        console.log(resp);

        const transaction = await axios.post(SOLANA_DEVNET, 
            {
              "jsonrpc": "2.0",
              "id": 1,
              "method": "getTransaction",
              "params": [
                `${resp}`,
                "json"
              ]
            }
          )
        
        if(!transaction.data.result)
        {   
            console.log("Error occured : Could not complete transaction");
            //add a toast
            //trans could not be completed e
            //some error occured
        }
        else{
            console.log("Transaction Completed" + transaction.data);
            //add a toash trans completed
        }
        

    }
    return <div>
        <input id = "amount" type="text" placeholder="a mount"></input>
        <button onClick={airdropSol}>Send Airdrop</button>
    </div>

}