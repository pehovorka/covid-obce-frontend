import React from "react";
import { Grid, Link, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { route } from "../../Routes";

export default function BackToHomeLink() {
  return (
    <Link component={RouterLink} to={route.home()}>
      <Grid container>
        <Grid item>
          <ArrowBackIosIcon />
        </Grid>
        <Grid item>
          <Typography>Zpět na hlavní stránku</Typography>
        </Grid>
      </Grid>
    </Link>
  );
}
