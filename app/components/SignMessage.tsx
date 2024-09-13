import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";

export function SignMessage(){
    const {publicKey, signMessage} = useWallet();

    const onClick = async () => {
        if(!publicKey){
            alert("Wallet not Connected");
            return;
        }
        if(!signMessage) {
            alert("Wallet does not support message signing");
            return;
        }

        const message = document.getElementById("message").value ;
        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);

        if(!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
            alert("Message signature invalid!")
            return;
        }
        alert(`Message signature : ${bs58.encode(signature)}`)
    }
    return (
        <div>
            <input id="message" type="text" placeholder="Message"></input>
            <button onClick={onClick}>Sign Message</button>
        </div>
    )
}