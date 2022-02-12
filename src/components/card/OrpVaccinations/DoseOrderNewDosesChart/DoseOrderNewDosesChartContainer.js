import React, { useState, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";
import { Skeleton } from "@mui/material";

import { DateLimitSelect } from "../..";
import { convertToDoseOrderNewDosesData } from "../orpVaccinationsUtils";

const DoseOrderNewDosesChart = lazy(() => import("./DoseOrderNewDosesChart"));

export default function DoseOrderNewDosesChartContainer({ data }) {
  const [limit, setLimit] = useState(90);
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
              Nově vykázaná očkování dle pořadí dávky
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
          <Skeleton
            variant="rectangular"
            width="100%"
            height={300}
            animation="wave"
          />
        }
      >
        <DoseOrderNewDosesChart
          data={convertToDoseOrderNewDosesData(data, limit)}
        />
      </Suspense>
    </>
  );
}

DoseOrderNewDosesChartContainer.propTypes = {
  data: PropTypes.array,
};
