import React, { useState } from "react";
import PropTypes from "prop-types";

import { Box, Grid, Typography } from "@material-ui/core";

import { DateLimitSelect } from "../..";
import { convertToDoseOrderCumulativeDosesData } from "../orpVaccinationsUtils";
import DoseOrderCumulativeDosesChart from "./DoseOrderCumulativeDosesChart";

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
        <Grid container spacing={4} justify="space-between">
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
      <DoseOrderCumulativeDosesChart
        data={convertToDoseOrderCumulativeDosesData(data, limit)}
        population={orpPopulation}
      />
    </>
  );
}

DoseOrderCumulativeDosesChartContainer.propTypes = {
  data: PropTypes.array,
  population: PropTypes.number,
};
