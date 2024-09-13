import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function ShowSolBalance(){
    const wallet = useWallet();
    const {connection} = useConnection();

    async function showBalance() {
        if(wallet.publicKey) {
            const balance = await connection.getBalance(wallet.publicKey);
            document.getElementById("balance").innerHTML = balance/LAMPORTS_PER_SOL;
        }
    }
    showBalance();
    return <div>
        <p> SOL Balance: </p> <div id = "balance"></div>
    </div>
}