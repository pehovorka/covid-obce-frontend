import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Box,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@material-ui/core";

import { getDoseOrderData } from "../orpVaccinationsUtils";
import { formatNumberToDisplay } from "../../../../utils/municipalityUtils";

export default function OrpVaccinationsBasicStats({
  lastDay,
  orpPopulation,
  orpName,
}) {
  const getPopulationPercentage = (number) => {
    const share = number / orpPopulation;

    return `${(share * 100).toLocaleString("cs-CZ", {
      maximumFractionDigits: 1,
    })} %`;
  };
  return (
    <>
      <Box my={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Dávka</TableCell>
              <TableCell align="right">% obyvatel</TableCell>
              <TableCell align="right">celkem dávek</TableCell>
              <TableCell align="right">nových dávek</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1.</TableCell>
              <TableCell align="right">
                {getPopulationPercentage(getDoseOrderData(lastDay, 1).td)}
              </TableCell>
              <TableCell align="right">
                {formatNumberToDisplay(getDoseOrderData(lastDay, 1).td)}
              </TableCell>
              <TableCell align="right">
                {formatNumberToDisplay(getDoseOrderData(lastDay, 1).nd)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2.</TableCell>
              <TableCell align="right">
                {getPopulationPercentage(getDoseOrderData(lastDay, 2).td)}
              </TableCell>
              <TableCell align="right">
                {formatNumberToDisplay(getDoseOrderData(lastDay, 2).td)}
              </TableCell>
              <TableCell align="right">
                {formatNumberToDisplay(getDoseOrderData(lastDay, 2).nd)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3.</TableCell>
              <TableCell align="right">
                {getPopulationPercentage(getDoseOrderData(lastDay, 3).td)}
              </TableCell>
              <TableCell align="right">
                {formatNumberToDisplay(getDoseOrderData(lastDay, 3).td)}
              </TableCell>
              <TableCell align="right">
                {formatNumberToDisplay(getDoseOrderData(lastDay, 3).nd)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      <Typography variant="caption">
        Počet obyvatel ve správním obvodu ORP {orpName}:{" "}
        {formatNumberToDisplay(orpPopulation)}
      </Typography>
    </>
  );
}

OrpVaccinationsBasicStats.propTypes = {
  lastDay: PropTypes.object,
  orpPopulation: PropTypes.number,
  orpName: PropTypes.string,
};
