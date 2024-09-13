import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { AlphaWalletAdapter } from "@solana/wallet-adapter-wallets";

export function AirDrop() {
    const wallet = useWallet();
    const {connection} = useConnection();

    async function  airdropSol() {
        const amount = document.getElementById("amount").value ;
        await connection.requestAirdrop(wallet.publicKey, 1e9 * amount);
        alert("Airdropped Sol")
    }
    return <div>
        <input id = "amount" type="text" placeholder="a mount"></input>
        <button onClick={airdropSol}>Send Airdrop</button>
    </div>

}