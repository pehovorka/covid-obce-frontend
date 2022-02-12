import { React } from "react";
import { NavLink } from "react-router-dom";
import { route } from "../../../Routes";
import { Button, Hidden } from "@mui/material/";
import MapIcon from "@mui/icons-material/Map";

import { useStyles } from "./AppBarButton.style";

export default function MapButton() {
  const classes = useStyles();

  return (
    <Button
      startIcon={<MapIcon />}
      variant="contained"
      color="primary"
      disableElevation={true}
      component={NavLink}
      to={{ pathname: route.map() }}
      className={`${classes.button} ${classes.centerIconOnMobile}`}
    >
      <Hidden smDown>Mapa</Hidden>
    </Button>
  );
}
