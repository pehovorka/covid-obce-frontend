import React, { lazy, Suspense, useState } from "react";
import PropTypes from "prop-types";

import { Box, Grid, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { DateLimitSelect } from "../..";
import { convertToDoseOrderCumulativeDosesData } from "../orpVaccinationsUtils";

const DoseOrderCumulativeDosesChart = lazy(() =>
  import("./DoseOrderCumulativeDosesChart")
);

export default function DoseOrderCumulativeDosesChartContainer({
  data,
  orpPopulation,
}) {
  const [limit, setLimit] = useState(0);
  const handleDateLimitChange = ({ select }) => {
    setLimit(select.target.value);
  };

  return (
    <>
      <Box pb={4}>
        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid item>
            <Typography variant="h6" gutterBottom>
              Vykázaná očkování dle pořadí dávky kumulativně
            </Typography>
          </Grid>
          <Grid item>
            <DateLimitSelect
              limit={limit}
              handleDateLimitChange={handleDateLimitChange}
            />
          </Grid>
        </Grid>
      </Box>
      <Suspense
        fallback={
          <Skeleton variant="rect" width="100%" height={300} animation="wave" />
        }
      >
        <DoseOrderCumulativeDosesChart
          data={convertToDoseOrderCumulativeDosesData(data, limit)}
          population={orpPopulation}
        />
      </Suspense>
    </>
  );
}

DoseOrderCumulativeDosesChartContainer.propTypes = {
  data: PropTypes.array,
  population: PropTypes.number,
};
