import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

import VaccineTypesChart from "./VaccineTypesChart";
import { convertToVaccineTypes } from "../orpVaccinationsUtils";

export default function VaccineTypesChartContainer({ vaccines, vaccineNames }) {
  return (
    <>
      <Typography variant="h6">Rozdělení dle typu očkovací látky</Typography>
      <VaccineTypesChart data={convertToVaccineTypes(vaccines, vaccineNames)} />
    </>
  );
}

VaccineTypesChartContainer.propTypes = {
  vaccines: PropTypes.array,
  vaccineNames: PropTypes.array,
};
