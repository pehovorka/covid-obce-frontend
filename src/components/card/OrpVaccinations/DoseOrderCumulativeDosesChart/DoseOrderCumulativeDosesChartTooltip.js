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
import { useStyles } from "./DoseOrderCumulativeDosesChartTooltip.style";

import { numberToString, dateToLongString } from "../../../../utils/general";

export default function DoseOrderCumulativeDosesChartTooltip({
  active,
  payload,
  label,
  NAMES,
}) {
  const styles = useStyles();
  const date = new Date(label);
  const stringDate = dateToLongString(date);

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
                <TableCell align="right">% obyvatel</TableCell>
                <TableCell align="right">celkem</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key="1st">
                <TableCell style={{ color: getProperty(NAMES.dose1TD).color }}>
                  1.
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty(NAMES.dose1TD).color }}
                >
                  {`${numberToString(
                    getProperty(NAMES.dose1TDRelative).value,
                    1
                  )} %`}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty(NAMES.dose1TD).color }}
                >
                  {numberToString(getProperty(NAMES.dose1TD).value)}
                </TableCell>
              </TableRow>

              <TableRow key="2nd">
                <TableCell style={{ color: getProperty(NAMES.dose2TD).color }}>
                  2.
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty(NAMES.dose2TD).color }}
                >
                  {`${numberToString(
                    getProperty(NAMES.dose2TDRelative).value,
                    1
                  )} %`}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty(NAMES.dose2TD).color }}
                >
                  {numberToString(getProperty(NAMES.dose2TD).value)}
                </TableCell>
              </TableRow>

              <TableRow key="3rd">
                <TableCell style={{ color: getProperty(NAMES.dose3TD).color }}>
                  3.
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty(NAMES.dose3TD).color }}
                >
                  {`${numberToString(
                    getProperty(NAMES.dose3TDRelative).value,
                    1
                  )} %`}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty(NAMES.dose3TD).color }}
                >
                  {numberToString(getProperty(NAMES.dose3TD).value)}
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

DoseOrderCumulativeDosesChartTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string,
};
