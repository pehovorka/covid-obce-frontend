import React, { useState, useEffect } from "react";
import { Snackbar } from "@material-ui/core/";
import Alert from "@material-ui/lab/Alert";

import { useMunicipalitiesState } from "../providers/MunicipalitiesProvider";

export default function SnackBar() {
  const { snackBarMessage } = useMunicipalitiesState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (snackBarMessage) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [snackBarMessage]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackBarMessage?.severity}>
          {snackBarMessage?.text}
        </Alert>
      </Snackbar>
    </>
  );
}
