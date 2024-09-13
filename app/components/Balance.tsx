'use client'
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardHeader, CircularProgress, TextField } from "@mui/material";

export function ShowSolBalance(){
    const wallet = useWallet();
    const {connection} = useConnection();
    const [loading, setLoading] = React.useState(true);

    async function showBalance() {
        if(wallet.publicKey) {
            const balance = await connection.getBalance(wallet.publicKey);
            const balanceElement = document.getElementById("balance") as HTMLDivElement;
            setLoading(false);
            balanceElement.innerHTML = (balance/LAMPORTS_PER_SOL).toString();
        }else
        {
            alert("Connect Wallet First");
        }
    }
    showBalance();
    
    return  (
        <div className="flex-grow bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4 pt-16">
            <Card className="w-full max-w-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
                <CardHeader
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6"
                    title={
                        <Typography variant="h5" className="text-2xl font-bold flex items-center gap-2">
                            {/* You can replace this with an actual coin icon */}
                            <span role="img" aria-label="coins">💰</span> Your Solana Balance
                        </Typography>
                    }
                />
                <CardContent className="p-6 flex flex-col items-center justify-center min-h-[12rem]">
                    {
                        loading ? <CircularProgress/> :<Typography id="balance" variant="h5" className="text-2xl font-bold flex items-center gap-2"></Typography>
                    }
                </CardContent>
                <CardActions className="bg-gray-50 p-6 flex justify-center">
                    <Button
                        onClick={showBalance}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                    >
                        Refresh Balance
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}