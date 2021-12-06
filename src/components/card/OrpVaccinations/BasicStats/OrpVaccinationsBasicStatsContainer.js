import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import OrpVaccinationsBasicStats from "./OrpVaccinationsBasicStats";

export default function OrpVaccinationsBasicStatsContainer({
  lastDay,
  orpPopulation,
  orpName,
}) {
  return (
    <>
      <Typography variant="h6">Vykázaná očkování dle pořadí dávky</Typography>
      <OrpVaccinationsBasicStats
        lastDay={lastDay}
        orpPopulation={orpPopulation}
        orpName={orpName}
      />
    </>
  );
}

OrpVaccinationsBasicStatsContainer.propTypes = {
  lastDay: PropTypes.object,
  orpPopulation: PropTypes.number,
  orpName: PropTypes.string,
};
