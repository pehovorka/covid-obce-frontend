import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Alert, Box } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@apollo/client";

import { MUNICIPALITY_OVERVIEW_QUERY } from "../../utils/queries";
import municipalitiesTopo from "../../assets/municipalitiesTopo.json";
import { TopoJSON, MapLoadingScreen, Legend, Title } from ".";
import { useStyles } from "./Map.style";

function Map() {
  const classes = useStyles();

  const bounds = [
    [51.06, 18.86],
    [48.55, 12.09],
  ];

  const [map, setMap] = useState(null);

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

  return municipalityCasesOverview.loading &&
    !municipalityCasesOverview.data ? (
    <MapLoadingScreen />
  ) : (
    <Box className={classes.container}>
      <MapContainer
        style={{ height: "100%" }}
        scrollWheelZoom={false}
        bounds={bounds}
        boundsOptions={{ maxZoom: 10 }}
        zoomSnap={0.25}
        preferCanvas={true}
        whenCreated={setMap}
        zoomControl={false}
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
        <Legend map={map} />
        <Title map={map} />
      </MapContainer>
    </Box>
  );
}

export default Map;
