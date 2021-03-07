import React, { useState } from "react";
import { Grid, Link, Box, Divider, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import { CookieDialog } from "./CookieDialog";
import { route } from "../Routes";
import { LastModified } from "./LastModified";

export function Footer() {
  const [openCookies, setCookiesOpen] = useState(false);

  const handleClickCookiesOpen = () => {
    setCookiesOpen(true);
  };
  const handleCookiesClose = () => {
    setCookiesOpen(false);
  };

  return (
    <Box mt={5} mb={3} textAlign={"center"}>
      <Box mb={2}>
        <Divider variant="middle" />
      </Box>
      <Grid container justify="center" spacing={1}>
        <Grid item xs={12} md>
          <Typography variant="body2" display="inline">
            <Link component={RouterLink} to={route.info()}>
              Více informací a popis dat
            </Link>
          </Typography>
        </Grid>

        <Grid item xs={12} md>
          <Typography variant="body2">
            <Link
              component="button"
              variant="body2"
              onClick={() => handleClickCookiesOpen()}
              style={{ verticalAlign: "top" }}
            >
              Cookies
            </Link>
          </Typography>
          <CookieDialog
            open={openCookies}
            setOpen={setCookiesOpen}
            handleClose={handleCookiesClose}
          />
        </Grid>

        <Grid item xs={12} md>
          <Typography variant="body2">
            Zdroj dat:{" "}
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
          </Typography>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Divider variant="middle" />
      </Box>
      <Box m={3} textAlign="center">
        <LastModified />
      </Box>
    </Box>
  );
}
