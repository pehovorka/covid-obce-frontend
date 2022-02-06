import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import municipalitiesTopo from "../../assets/municipalitiesTopo.json";
import TopoJSON from "./TopoJSON";
import { useQuery } from "@apollo/client";
import { MUNICIPALITY_OVERVIEW_QUERY } from "../../utils/queries";
import { Alert } from "@material-ui/lab";

function Map() {
  const municipalityOverview = useQuery(MUNICIPALITY_OVERVIEW_QUERY, {
    fetchPolicy: "cache-first",
  });

  if (municipalityOverview.loading && !municipalityOverview.data) {
    return null;
  }
  if (municipalityOverview.error) {
    return (
      <Alert severity="error">
        Chyba při načítání dat. Zkuste to prosím znovu později.
      </Alert>
    );
  }

  return (
    <MapContainer center={[49.8, 15.5]} zoom={8} style={{ height: 700 }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TopoJSON data={municipalitiesTopo} />
    </MapContainer>
  );
}

export default Map;
