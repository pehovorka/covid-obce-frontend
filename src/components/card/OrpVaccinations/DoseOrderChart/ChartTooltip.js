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
import { useStyles } from "./ChartTooltip.style";

export default function ChartTooltip({ active, payload, label }) {
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
              <TableCell>Dávka</TableCell>
              <TableCell align="right">% obyvatel</TableCell>
              <TableCell align="right">celkem</TableCell>
              <TableCell align="right">nově</TableCell>
            </TableHead>
            <TableBody>
              <TableRow key="1st">
                <TableCell style={{ color: getProperty("dose1TD").color }}>
                  1.
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty("dose1TD").color }}
                >
                  {`${getProperty("dose1TDRelative").value.toLocaleString(
                    "cs-CZ",
                    { maximumFractionDigits: 1 }
                  )} %`}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty("dose1TD").color }}
                >
                  {getProperty("dose1TD").value.toLocaleString("cs-CZ")}
                </TableCell>

                <TableCell
                  align="right"
                  style={{ color: getProperty("dose1TD").color }}
                >
                  {getProperty("dose1ND").value.toLocaleString("cs-CZ")}
                </TableCell>
              </TableRow>

              <TableRow key="2nd">
                <TableCell style={{ color: getProperty("dose2TD").color }}>
                  2.
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty("dose2TD").color }}
                >
                  {`${getProperty("dose2TDRelative").value.toLocaleString(
                    "cs-CZ",
                    { maximumFractionDigits: 1 }
                  )} %`}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty("dose2TD").color }}
                >
                  {getProperty("dose2TD").value.toLocaleString("cs-CZ")}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty("dose2TD").color }}
                >
                  {getProperty("dose2ND").value.toLocaleString("cs-CZ")}
                </TableCell>
              </TableRow>

              <TableRow key="3rd">
                <TableCell style={{ color: getProperty("dose3TD").color }}>
                  3.
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty("dose3TD").color }}
                >
                  {`${getProperty("dose3TDRelative").value.toLocaleString(
                    "cs-CZ",
                    { maximumFractionDigits: 1 }
                  )} %`}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty("dose3TD").color }}
                >
                  {getProperty("dose3TD").value.toLocaleString("cs-CZ")}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: getProperty("dose3TD").color }}
                >
                  {getProperty("dose3ND").value.toLocaleString("cs-CZ")}
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

ChartTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string,
};
