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
import { dateToLongString, numberToString } from "../../../../utils/general";

export default function DoseOrderNewDosesChartTooltip({
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
                <TableCell align="right">nové dávky</TableCell>
                <TableCell align="right">7denní průměr</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key="1st">
                <TableCell style={{ color: getProperty(NAMES.dose1ND).color }}>
                  1.
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty(NAMES.dose1ND).color }}
                >
                  {numberToString(getProperty(NAMES.dose1ND).value)}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty(NAMES.dose1ND).color }}
                >
                  {numberToString(getProperty(NAMES.dose1NDA).value, 1)}
                </TableCell>
              </TableRow>
              <TableRow key="2nd">
                <TableCell style={{ color: getProperty(NAMES.dose2ND).color }}>
                  2.
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty(NAMES.dose2ND).color }}
                >
                  {numberToString(getProperty(NAMES.dose2ND).value)}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty(NAMES.dose2ND).color }}
                >
                  {numberToString(getProperty(NAMES.dose2NDA).value, 1)}
                </TableCell>
              </TableRow>

              <TableRow key="3rd">
                <TableCell style={{ color: getProperty(NAMES.dose3ND).color }}>
                  3.
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty(NAMES.dose3ND).color }}
                >
                  {numberToString(getProperty(NAMES.dose3ND).value)}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty(NAMES.dose3ND).color }}
                >
                  {numberToString(getProperty(NAMES.dose3NDA).value, 1)}
                </TableCell>
              </TableRow>
              <TableRow key="total">
                <TableCell>Celkem</TableCell>
                <TableCell align="right">
                  {getProperty(NAMES.dose1ND).value +
                    getProperty(NAMES.dose2ND).value +
                    getProperty(NAMES.dose3ND).value}
                </TableCell>
                <TableCell align="right">
                  {numberToString(getProperty(NAMES.dosesAllNDA).value, 1)}
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
  NAMES: PropTypes.object,
};
