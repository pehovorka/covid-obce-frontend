import { React } from "react";
import { Link as RouterLink } from "react-router-dom";
import { route } from "../../../Routes";
import { Button } from "@mui/material/";
import MapIcon from "@mui/icons-material/Map";

export default function MapButton() {
  return (
    <Button
      startIcon={<MapIcon />}
      variant="contained"
      color="primary"
      disableElevation={true}
      component={RouterLink}
      to={{ pathname: route.map() }}
    >
      Mapa
    </Button>
  );
}
