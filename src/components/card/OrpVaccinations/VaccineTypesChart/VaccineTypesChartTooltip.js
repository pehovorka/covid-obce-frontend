import React from "react";
import PropTypes from "prop-types";
import { Box, Paper, Typography, Divider } from "@mui/material/";
import { useStyles } from "./VaccineTypesChartTooltip.style";
import { numberToString } from "../../../../utils/general";

export default function VaccineTypesChartTooltip({ active, payload, data }) {
  const styles = useStyles();

  const sum = data?.reduce((pv, cv) => pv + cv.value, 0);

  if (active && payload && payload.length) {
    return (
      <Paper
        className="custom-tooltip"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.96)" }}
      >
        <Box p={1} minWidth="15rem">
          {/* Title */}
          <Typography className={styles.title}>{payload[0].name}</Typography>
          <Divider />

          {/* Main content */}
          <Typography className={`${styles.bold} ${styles.text}`}>
            {numberToString(payload[0].value, 0)}
          </Typography>
          <Typography className={styles.text}>
            {numberToString((payload[0].value / sum) * 100, 1)} %
          </Typography>
        </Box>
      </Paper>
    );
  }

  return null;
}

VaccineTypesChartTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  data: PropTypes.array.isRequired,
};
