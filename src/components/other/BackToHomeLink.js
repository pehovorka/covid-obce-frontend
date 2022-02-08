import React from "react";
import { Grid, Link, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link as RouterLink } from "react-router-dom";

import { route } from "../../Routes";

export default function BackToHomeLink() {
  return (
    <Link component={RouterLink} to={route.home()} underline="hover">
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
