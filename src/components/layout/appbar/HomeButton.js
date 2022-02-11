import React from "react";
import { NavLink } from "react-router-dom";
import { Badge, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import { useMunicipalitiesState } from "../../../providers/MunicipalitiesProvider";
import { route } from "../../../Routes";
import { useStyles } from "./AppBarButton.style";

function HomeButton() {
  const { municipalities } = useMunicipalitiesState();
  const classes = useStyles();

  return (
    <Button
      startIcon={
        <Badge color="secondary" badgeContent={municipalities.length}>
          <HomeIcon />
        </Badge>
      }
      variant="contained"
      color="primary"
      disableElevation={true}
      component={NavLink}
      exact={true}
      to={{ pathname: route.home() }}
      className={`${classes.button} ${classes.centerIcon}`}
    ></Button>
  );
}

HomeButton.propTypes = {};

export default HomeButton;
