import React from "react";
import { Dialog, Link, Typography } from "@material-ui/core/";
import { DialogTitle, DialogContent } from "./CookieDialog.style";

export function CookieDialog({ open, setOpen, handleClose }) {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
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
          >
            zde
          </Link>
          . Tyto cookies jsou řízeny třetími stranami a nemáme přístup ke čtení
          nebo zápisu těchto dat.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
