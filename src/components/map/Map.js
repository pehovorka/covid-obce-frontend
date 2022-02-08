import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Alert, Box, Grid, LinearProgress, Typography } from "@mui/material";
import "leaflet/dist/leaflet.css";

import municipalitiesTopo from "../../assets/municipalitiesTopo.json";
import TopoJSON from "./TopoJSON";
import { useQuery } from "@apollo/client";
import { MUNICIPALITY_OVERVIEW_QUERY } from "../../utils/queries";
import { useStyles } from "./Map.style";

function Map() {
  const classes = useStyles();

  const bounds = [
    [51.06, 18.86],
    [48.55, 12.09],
  ];

  const municipalityCasesOverview = useQuery(MUNICIPALITY_OVERVIEW_QUERY, {
    fetchPolicy: "cache-first",
  });

  if (municipalityCasesOverview.error) {
    return (
      <Alert severity="error" className={classes.error}>
        Chyba při načítání dat. Zkuste to prosím znovu později.
      </Alert>
    );
  }

  return (
    <Box className={classes.container}>
      {municipalityCasesOverview.loading && !municipalityCasesOverview.data ? (
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
      ) : (
        <MapContainer
          style={{ height: "100%" }}
          scrollWheelZoom={false}
          bounds={bounds}
          boundsOptions={{ maxZoom: 10 }}
          zoomSnap={0.25}
          preferCanvas={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <TopoJSON
            data={municipalitiesTopo}
            municipalityCasesOverview={
              municipalityCasesOverview.data.municipalityCasesOverview
            }
          />
        </MapContainer>
      )}
    </Box>
  );
}

export default Map;
