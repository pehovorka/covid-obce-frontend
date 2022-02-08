import React, { useState } from "react";
import { Grid, Link, Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { GitHub } from "@mui/icons-material";

import { route } from "../../../../Routes";
import { CookieDialog, LastModified } from "../.";
import { useMunicipalitiesState } from "../../../../providers/MunicipalitiesProvider";
import { useStyles } from "./Footer.style";

export default function Footer() {
  const classes = useStyles();
  const { municipalities } = useMunicipalitiesState();
  const [openCookies, setCookiesOpen] = useState(false);

  const handleClickCookiesOpen = () => {
    setCookiesOpen(true);
  };
  const handleCookiesClose = () => {
    setCookiesOpen(false);
  };

  return (
    <Box className={classes.container} textAlign="center" component="footer">
      <Box className={classes.content}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md>
            <Typography>
              <Link
                component={RouterLink}
                to={route.info()}
                className={classes.link}
                underline="hover">
                Více informací a popis dat
              </Link>
            </Typography>
          </Grid>

          <Grid item xs={12} md>
            <Link
              className={classes.link}
              component="a"
              onClick={() => handleClickCookiesOpen()}
              style={{ cursor: "pointer" }}
              underline="hover">
              Cookies
            </Link>
            <CookieDialog
              open={openCookies}
              setOpen={setCookiesOpen}
              handleClose={handleCookiesClose}
            />
          </Grid>

          <Grid item xs={12} md>
            <Typography>
              Data:{" "}
              <Link
                href="https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19"
                target="_blank"
                rel="noreferrer"
                className={classes.link}
                underline="hover">
                ÚZIS
              </Link>
              ,{" "}
              <Link
                href="https://www.czso.cz/csu/czso/pocet-obyvatel-v-obcich-k-112021"
                target="_blank"
                rel="noreferrer"
                className={classes.link}
                underline="hover">
                ČSÚ
              </Link>
            </Typography>
          </Grid>

          {municipalities.length === 0 && (
            <Grid item xs={12} md>
              <Typography>
                Ilustrace:{" "}
                <Link
                  href="http://www.freepik.com"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.link}
                  underline="hover">
                  macrovector / Freepik
                </Link>
              </Typography>
            </Grid>
          )}
        </Grid>

        <Box mt={3} textAlign="center">
          <LastModified />
        </Box>

        <Box mt={1} textAlign="center">
          <Link
            href="https://github.com/search?q=user%3Apehovorka+covidvobcich"
            target="_blank"
            rel="noopener"
            className={classes.icon}
            underline="hover">
            <GitHub titleAccess="GitHub" />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
