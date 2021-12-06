import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core/";
import { useStyles } from "./DoseOrderNewDosesChartTooltip.style";

export default function DoseOrderNewDosesChartTooltip({
  active,
  payload,
  label,
}) {
  const styles = useStyles();
  const date = new Date(label);
  const stringDate = date.toLocaleDateString("cs-CZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  if (active && payload && payload.length) {
    const getProperty = (name) => payload.find((item) => item.name === name);

    return (
      <Paper
        className="custom-tooltip"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
      >
        <Box p={1} minWidth="15rem">
          {/* Date */}
          <Typography className={styles.title}>{stringDate}</Typography>
          <Divider />
          {/* Main content */}
          <Table size="small" padding="none">
            <TableHead>
              <TableRow>
                <TableCell>Dávka</TableCell>
                <TableCell align="right">nové dávky</TableCell>
                <TableCell align="right">7denní průměr</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key="1st">
                <TableCell style={{ color: getProperty("dose1ND").color }}>
                  1.
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty("dose1ND").color }}
                >
                  {getProperty("dose1ND").value.toLocaleString("cs-CZ")}
                </TableCell>
              </TableRow>
              <TableRow key="2nd">
                <TableCell style={{ color: getProperty("dose2ND").color }}>
                  2.
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty("dose2ND").color }}
                >
                  {getProperty("dose2ND").value.toLocaleString("cs-CZ")}
                </TableCell>
              </TableRow>

              <TableRow key="total">
                <TableCell style={{ color: getProperty("dose3ND").color }}>
                  3.
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty("dose3ND").color }}
                >
                  {getProperty("dose3ND").value.toLocaleString("cs-CZ")}
                </TableCell>
              </TableRow>
              <TableRow key="3rd">
                <TableCell>Celkem </TableCell>
                <TableCell align="right">
                  {getProperty("dose1ND").value +
                    getProperty("dose2ND").value +
                    getProperty("dose3ND").value}
                </TableCell>
                <TableCell align="right">
                  {getProperty("7denní průměr").value}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Paper>
    );
  }

  return null;
}

DoseOrderNewDosesChartTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string,
};
