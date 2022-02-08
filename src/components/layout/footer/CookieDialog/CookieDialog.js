import React from "react";
import { Dialog, Link, Typography } from "@mui/material/";
import { DialogTitle, DialogContent } from "./CookieDialog.style";

export default function CookieDialog({ open, handleClose }) {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Prohlášení o použití cookies
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          Tento web ukládá na vaše zařízení soubory, obecně nazvané cookies.
        </Typography>
        <Typography gutterBottom>
          Do vašeho prohlížeče ukládáme seznam obcí které jste si přidali,
          abyste je nemuseli při příští návštěvě hledat znovu.
        </Typography>
        <Typography gutterBottom>
          Dále používáme cookies třetích stran, konkrétně Google Analytics pro
          analýzu návštěvnosti. Více informací naleznete{" "}
          <Link
            href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage"
            target="_blank"
            rel="noreferrer"
            underline="hover">
            zde
          </Link>
          . Tyto cookies jsou řízeny třetími stranami a nemáme přístup ke čtení
          nebo zápisu těchto dat.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
