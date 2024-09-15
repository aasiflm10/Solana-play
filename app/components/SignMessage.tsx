"use client";
import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader, TextField } from "@mui/material";
import CustomizedSnackbars from "./Snackbar";
import { useState } from "react";

export function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null); // Manage the Snackbar message state
  const [openSnackbar, setOpenSnackbar] = useState(false); // Control when the Snackbar should open

  const onClick = async () => {
    if (!publicKey) {
      alert("Wallet not Connected");
      return;
    }
    if (!signMessage) {
      alert("Wallet does not support message signing");
      return;
    }

    const message = (document.getElementById("message") as HTMLInputElement)
      .value;
    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);

    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
      alert("Message signature invalid!");
      return;
    }
    // alert(`Message signature : ${bs58.encode(signature)}`)
    const msg = `Message signature : ${bs58.encode(signature)}`;
    console.log(msg);

    setSnackbarMessage(msg);
    setOpenSnackbar(true);
  };

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
              Sign Message
            </Typography>
          }
        />
        <CardContent className="p-6 space-y-4">
          <TextField
            id="message"
            type="text"
            placeholder="Type your message here"
            className="w-full"
          />
        </CardContent>
        <CardActions className="bg-gray-50 p-6">
          <Button
            onClick={onClick}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            Sign Message
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
