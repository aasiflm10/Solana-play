import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useCallback } from "react";

export function SendSol(){
    const wallet = useWallet();
    const {connection} = useConnection();

    const sendTransaction = async ()=>{
        const publicKey = wallet.publicKey;

        const to = document.getElementById("address").value ;
        const amount = document.getElementById("amount").value ;

        const transaction  = new Transaction();

        transaction.add(
            SystemProgram.transfer({
                fromPubkey : publicKey,
                toPubkey : new PublicKey(to),
                lamports : amount * LAMPORTS_PER_SOL,
            })
        )

        await wallet.sendTransaction(transaction , connection);
        alert("SOL send successfully to" + to);

    }
    return <div>
        <input id="address" type="text" placeholder="type receivers details"></input>
        <input id="amount" type="text" placeholder="Amount of SOL"></input>
        <button onClick={sendTransaction}>Send SOL</button>
    </div>
}