import React from "react";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { useStyles } from "./MapLoadingScreen.style";

function MapLoadingScreen() {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        spacing={6}
        style={{ height: "100%" }}
      >
        <Grid item xs={8}>
          <Typography component="p" variant="h5" align="center">
            Mapa se načítá...
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <LinearProgress />
        </Grid>
      </Grid>
    </Box>
  );
}

export default MapLoadingScreen;
