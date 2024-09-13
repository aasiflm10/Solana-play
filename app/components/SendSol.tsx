import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActions, CardContent, CardHeader, TextField } from "@mui/material";

export function SendSol(){
    const wallet = useWallet();
    const {connection} = useConnection();

    const sendTransaction = async ()=>{

        if(!wallet.publicKey)
        {
            alert("Connect Wallet First");
            return;
        }

        const publicKey = wallet.publicKey;
        const to = (document.getElementById("address") as HTMLInputElement).value ;
        const inputAmount = (document.getElementById("amount") as HTMLInputElement).value ;
        const amount = parseFloat(inputAmount);
        
        if (!to || !amount) {
            alert("Please enter a valid address and amount");
            return;
        }
        
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
    return (
        <div className="flex-grow bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4 pt-16">
            <Card className="w-full max-w-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
                <CardHeader
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6"
                    title={
                        <Typography variant="h5" className="text-2xl font-bold flex items-center gap-2">
                            <span role="img" aria-label="coins">💰</span> Send Solana
                        </Typography>
                    }
                />
                <CardContent className="p-6 space-y-4">
                    <TextField
                        id="address"
                        type="text"
                        placeholder="Enter Address"
                        className="w-full"
                    />
                    <TextField
                        id="amount"
                        type="text"
                        placeholder="Enter SOL amount"
                        className="w-full"
                    />
                </CardContent>
                <CardActions className="bg-gray-50 p-6">
                    <Button
                        onClick={sendTransaction}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                    >
                        Send SOL
                    </Button>
                </CardActions>
            </Card>

    </div>);
}