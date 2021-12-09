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
import { numberToString } from "../../../../utils/general";

export default function OrpVaccinationsBasicStats({
  lastDay,
  orpPopulation,
  orpName,
  municipalityName,
  municipalityPopulation,
}) {
  const getPopulationPercentage = (number) => {
    const share = number / orpPopulation;

    return `${numberToString(share * 100, 1)} %`;
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
                {numberToString(getDoseOrderData(lastDay, 1).td)}
              </TableCell>
              <TableCell align="right">
                {numberToString(getDoseOrderData(lastDay, 1).nd)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2.</TableCell>
              <TableCell align="right">
                {getPopulationPercentage(getDoseOrderData(lastDay, 2).td)}
              </TableCell>
              <TableCell align="right">
                {numberToString(getDoseOrderData(lastDay, 2).td)}
              </TableCell>
              <TableCell align="right">
                {numberToString(getDoseOrderData(lastDay, 2).nd)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3.</TableCell>
              <TableCell align="right">
                {getPopulationPercentage(getDoseOrderData(lastDay, 3).td)}
              </TableCell>
              <TableCell align="right">
                {numberToString(getDoseOrderData(lastDay, 3).td)}
              </TableCell>
              <TableCell align="right">
                {numberToString(getDoseOrderData(lastDay, 3).nd)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      <Typography variant="caption" component="p">
        Počet obyvatel ve správním obvodu obce s rozšířenou působností {orpName}{" "}
        je {numberToString(orpPopulation)}. Obec {municipalityName} tvoří{" "}
        {numberToString((municipalityPopulation / orpPopulation) * 100, 1)} % z
        celkového počtu obyvatel v tomto správním obvodu.
      </Typography>
    </>
  );
}

OrpVaccinationsBasicStats.propTypes = {
  lastDay: PropTypes.object,
  orpPopulation: PropTypes.number,
  orpName: PropTypes.string,
  municipalityName: PropTypes.string,
  municipalityPopulation: PropTypes.number,
};
