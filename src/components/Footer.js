import React, { useState } from "react";
import { Grid, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import { CookieDialog } from "./CookieDialog";
import { route } from "../Routes";

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
        <Link component={RouterLink} to={route.info()}>
          O webu
        </Link>
      </Grid>
      <Grid item>
        <Link
          component="button"
          variant="body2"
          onClick={() => handleClickCookiesOpen()}
          style={{ verticalAlign: "top" }}
        >
          Cookies
        </Link>
        <CookieDialog
          open={openCookies}
          setOpen={setCookiesOpen}
          handleClose={handleCookiesClose}
        />
      </Grid>
      <Grid item>
        Zdroje dat:{" "}
        <Link
          href="https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19"
          target="_blank"
          rel="noreferrer"
        >
          ÚZIS
        </Link>
        ,{" "}
        <Link
          href="https://www.czso.cz/csu/czso/pocet-obyvatel-v-obcich-k-112019"
          target="_blank"
          rel="noreferrer"
        >
          ČSÚ
        </Link>
      </Grid>
    </Grid>
  );
}
