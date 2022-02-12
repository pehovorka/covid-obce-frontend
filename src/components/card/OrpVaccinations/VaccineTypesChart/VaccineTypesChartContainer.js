import React, { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { Typography, Skeleton } from "@mui/material";

import { convertToVaccineTypes } from "../orpVaccinationsUtils";

const VaccineTypesChart = lazy(() => import("./VaccineTypesChart"));

export default function VaccineTypesChartContainer({ vaccines, vaccineNames }) {
  return (
    <>
      <Typography variant="h6">
        Vykázaná očkování celkem dle typu očkovací látky
      </Typography>
      <Suspense
        fallback={
          <Skeleton
            variant="rectangular"
            width="100%"
            height={260}
            animation="wave"
          />
        }
      >
        <VaccineTypesChart
          data={convertToVaccineTypes(vaccines, vaccineNames)}
        />
      </Suspense>
    </>
  );
}

VaccineTypesChartContainer.propTypes = {
  vaccines: PropTypes.array,
  vaccineNames: PropTypes.array,
};
