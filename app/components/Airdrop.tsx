import { SOLANA_DEVNET } from "@/config";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { AlphaWalletAdapter } from "@solana/wallet-adapter-wallets";
import axios from "axios";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader, TextField } from "@mui/material";
import { Connection } from "@solana/web3.js";
import CustomizedSnackbars from "./Snackbar";

export function AirDrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [snackbarMessage, setSnackbarMessage] = React.useState<string | null>(
    null
  ); // Manage the Snackbar message state
  const [openSnackbar, setOpenSnackbar] = React.useState(false); // Control when the Snackbar should open

  const getConfirmation = async (connection: Connection, tx: string) => {
    const result = await connection.getSignatureStatus(tx, {
      searchTransactionHistory: true,
    });
    return result.value?.confirmationStatus;
  };

  async function airdropSol() {
    if (!wallet.publicKey) {
      alert("Connect Wallet first");
      return;
    }

    const input = (document.getElementById("amount") as HTMLInputElement).value;
    const amount = parseFloat(input);
    console.log("Amount entered: " + amount);
    const airdropSignature = await connection.requestAirdrop(
      wallet.publicKey,
      1e9 * amount
    );
    console.log(airdropSignature);

    const latestBlockHash = await connection.getLatestBlockhash();
    console.log(latestBlockHash);
    try {
      setTimeout(async () => {
        const trans = await connection.getSignatureStatus(airdropSignature);
        console.log("Transaction Status : ");
        console.log(trans);

        if (!trans.value?.err) {
          console.log("Transaction Confirmed");
          console.log(trans.value?.confirmationStatus);
          //Show a toast of Transaction Confirmed
          const msg = `Airdropped ${amount} SOL successfully`;
          setSnackbarMessage(msg);
          setOpenSnackbar(true);
        } else {
          console.log("Transaction Not visible on your side");
          //show an alert
          const msg = `Could not complete the transaction`;
          alert(msg);
        }
      }, 5000);
    } catch (err) {
      console.log("error occured");
      console.log(err);
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close the Snackbar
  };

  return (
    <div className="flex-grow  flex items-center justify-center p-4 pt-16">
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
              Solana Airdrop
            </Typography>
          }
        />
        <CardContent className="p-6 space-y-4">
          <div className="relative h-40 overflow-hidden rounded-lg">
            <img
              src="https://smithii.io/wp-content/uploads/2023/08/AIRDROP-SOLANA-TOKEN-SMITHII-e1692041288405.png"
              alt="Solana landscape"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
          </div>
          <TextField
            id="amount"
            type="number"
            placeholder="Enter SOL amount"
            className="w-full"
          />
        </CardContent>
        <CardActions className="bg-gray-50 p-6">
          <Button
            onClick={airdropSol}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            Airdrop SOL
          </Button>
        </CardActions>
      </Card>
      {snackbarMessage && (
        <CustomizedSnackbars
          message={snackbarMessage}
          open={openSnackbar}
          handleClose={handleCloseSnackbar}
        />
      )}
    </div>
  );
}
