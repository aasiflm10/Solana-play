import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface CustomizedSnackbarsProps {
  message: string;
}
interface CustomizedSnackbarsProps {
  message: string;
  open: boolean;
  handleClose: () => void;
}

export default function CustomizedSnackbars({
  message,
  open,
  handleClose,
}: CustomizedSnackbarsProps) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
