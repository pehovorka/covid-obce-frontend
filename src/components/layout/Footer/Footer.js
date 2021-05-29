import React, { useState } from "react";
import { Grid, Link, Box, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import { route } from "../../../Routes";
import { CookieDialog, LastModified } from ".";
import { useMunicipalitiesState } from "../../../providers/MunicipalitiesProvider";
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
              >
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
            >
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
              >
                ÚZIS
              </Link>
              ,{" "}
              <Link
                href="https://www.czso.cz/csu/czso/pocet-obyvatel-v-obcich-k-112019"
                target="_blank"
                rel="noreferrer"
                className={classes.link}
              >
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
                >
                  macrovector / Freepik
                </Link>
              </Typography>
            </Grid>
          )}
        </Grid>

        <Box m={3} textAlign="center">
          <LastModified />
        </Box>
      </Box>
    </Box>
  );
}
