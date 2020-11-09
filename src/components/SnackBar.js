import React, { useState } from "react";
import { Button, Snackbar } from "@material-ui/core/";
import Alert from "@material-ui/lab/Alert";

export function SnackBar({ message, severity, open, setOpen }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
