'use client';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader, CircularProgress } from "@mui/material";

export function ShowSolBalance() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [loading, setLoading] = React.useState(false);
  const [balance, setBalance] = React.useState<string | null>(null);

  // Ref to prevent double fetching in Strict Mode
  const hasFetchedBalance = React.useRef(false);

  // Function to show balance
  async function showBalance() {
    console.log("showBalance called");
    if (wallet.publicKey) {
      setLoading(true);
      try {
        const fetchedBalance = await connection.getBalance(wallet.publicKey);
        setBalance((fetchedBalance / LAMPORTS_PER_SOL).toFixed(2).toString());
      } catch (error) {
        console.error("Error fetching balance:", error);
        alert("Error fetching balance. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Connect Wallet First");
    }
  }

  // useEffect to delay fetching balance
  React.useEffect(() => {
    if (!hasFetchedBalance.current) {
      // Introduce delay and wait for wallet to connect
      const checkWalletConnection = () => {
        console.log("checkWalletConnection called");
        if (wallet.publicKey) {
          // If the wallet is connected, fetch balance
          showBalance();
          hasFetchedBalance.current = true;
          clearTimeout(timeout1Id); 
        } else {
          // Retry after a delay
          const timeout2Id = setTimeout(checkWalletConnection, 2000); // Retry every 2 seconds
          clearTimeout(timeout2Id)
        }
      };

      // Start checking after an initial delay
      const timeout1Id = setTimeout(checkWalletConnection, 2000); // Initial 2-second delay before starting to check
    }
  }, [wallet.publicKey]); // Dependency on wallet.publicKey to rerun if it changes

  return (
    <div className="flex-grow bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4 pt-16">
      <Card className="w-full max-w-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
        <CardHeader
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6"
          title={
            <Typography
              variant="h5"
              className="text-2xl font-bold flex items-center gap-2"
            >
              <span role="img" aria-label="coins">
                💰
              </span>{" "}
              Your Solana Balance
            </Typography>
          }
        />
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[12rem]">
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography
              id="balance"
              variant="h5"
              className="text-2xl font-bold flex items-center gap-2"
            >
              {balance !== null ? balance : "No balance available"}
            </Typography>
          )}
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
