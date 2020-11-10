import React, { useState } from "react";
import { Divider, Grid, Link } from "@material-ui/core";

import { CookieDialog } from "./CookieDialog";

export function Footer() {
  const [openCookies, setCookiesOpen] = useState(false);

  const handleClickCookiesOpen = () => {
    setCookiesOpen(true);
  };
  const handleCookiesClose = () => {
    setCookiesOpen(false);
  };

  return (
    <Grid container justify="center" spacing={5}>
      <Grid item>
        <Link
          href="https://www.linkedin.com/in/petr-hovorka-40a198b2/"
          target="_blank"
          rel="noreferrer"
        >
          Kontakt
        </Link>
      </Grid>
      <Grid item>
        <Link href="#" onClick={() => handleClickCookiesOpen()}>
          Cookies
        </Link>
        <CookieDialog
          open={openCookies}
          setOpen={setCookiesOpen}
          handleClose={handleCookiesClose}
        />
      </Grid>
      <Grid item>
        <Link
          href="https://share.uzis.cz/s/dCZBiARJ27ayeoS"
          target="_blank"
          rel="noreferrer"
        >
          Data – ÚZIS
        </Link>
      </Grid>
    </Grid>
  );
}
