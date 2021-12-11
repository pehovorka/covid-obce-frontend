import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  CardActions,
  CircularProgress,
  Collapse,
  Grid,
  useTheme,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

import { SyringeIcon } from "../../../assets/SyringeIcon";
import OrpVaccinationsContainer from "./OrpVaccinationsContainer";
import { useStyles } from "./OrpVaccinationsButton.style";

function OrpVaccinationsButton({ orp, municipality, municipalityName }) {
  const theme = useTheme();
  const classes = useStyles();
  const vaccinationButton = useRef(null);

  const [expanded, setExpanded] = useState(false);
  const [orpLoading, setOrpLoading] = useState(false);

  useEffect(() => {
    if (expanded && !orpLoading) {
      vaccinationButton.current.scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [expanded, orpLoading]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const municipalityPopulation =
    municipality?.data?.municipalityCases.municipalityPopulation;

  return (
    <>
      <CardActions>
        <Grid container justifyContent="flex-start">
          <Grid item>
            <Box style={{ position: "relative" }}>
              <Button
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="Zobrazit informace o očkování"
                disabled={orpLoading || municipality.loading}
                startIcon={
                  <SyringeIcon size={18} color={theme.palette.primary.dark} />
                }
                ref={vaccinationButton}
              >
                Očkování na území ORP {orp?.orpName}
                <ExpandMoreIcon
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded && !orpLoading,
                  })}
                />
                {orpLoading && (
                  <CircularProgress className={classes.spinner} size={24} />
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <OrpVaccinationsContainer
          orpId={orp?.orpId}
          municipalityName={municipalityName}
          municipalityPopulation={municipalityPopulation}
          setOrpLoading={setOrpLoading}
        />
      </Collapse>
    </>
  );
}

OrpVaccinationsButton.propTypes = {
  orp: PropTypes.object,
  municipality: PropTypes.object,
  municipalityName: PropTypes.string,
};

export default OrpVaccinationsButton;
