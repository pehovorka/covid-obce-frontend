import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import municipalitiesTopo from "../../assets/municipalitiesTopo.json";
import TopoJSON from "./TopoJSON";
import { useQuery } from "@apollo/client";
import { MUNICIPALITY_OVERVIEW_QUERY } from "../../utils/queries";
import { Alert } from "@material-ui/lab";

function Map() {
  const bounds = [
    [51.06, 18.86],
    [48.55, 12.09],
  ];

  const municipalityCasesOverview = useQuery(MUNICIPALITY_OVERVIEW_QUERY, {
    fetchPolicy: "cache-first",
  });

  if (municipalityCasesOverview.loading && !municipalityCasesOverview.data) {
    return null;
  }
  if (municipalityCasesOverview.error) {
    return (
      <Alert severity="error">
        Chyba při načítání dat. Zkuste to prosím znovu později.
      </Alert>
    );
  }

  return (
    <MapContainer
      style={{ height: "calc(100vh - 72px)" }}
      scrollWheelZoom={false}
      bounds={bounds}
      boundsOptions={{ maxZoom: 10 }}
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
  );
}

export default Map;
