import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  Box,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  makeStyles,
  Button,
  ButtonGroup,
  CardHeader,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableBody,
  TableHead,
  Paper,
} from "@material-ui/core/";

import { Chart } from "./Chart";

const OBEC_DETAIL_QUERY = gql`
  query Obec($obec_kod: String!, $limit: Int!) {
    obec(obec_kod: $obec_kod, limit: $limit) {
      obec_nazev
      datum
      aktualne_nemocnych
      nove_pripady
    }
  }
`;

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 15,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 22,
  },
  pos: {
    marginBottom: 12,
  },
});

export function TownCard({ obec_nazev, obec_kod }) {
  const [limit, setLimit] = useState(90);
  const [queryLimit, setQueryLimit] = useState(90);
  const obec = useQuery(OBEC_DETAIL_QUERY, {
    variables: { obec_kod, limit: queryLimit },
    fetchPolicy: "cache-first",
  });

  console.log(queryLimit);
  const convertToGraphData = (stringData) => {
    const graphData = stringData.map((item) => {
      const container = {};
      container.datum = new Date(item.datum).toLocaleDateString("cs-CZ", {});
      container.aktualne_nemocnych = parseInt(item.aktualne_nemocnych);
      container.nove_pripady = parseInt(item.nove_pripady);
      return container;
    });
    graphData.reverse();
    return graphData.slice(-limit);
  };

  //console.log(obecData[obecData.length - 1].aktualne_nemocnych);
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <Box m={1}>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={() => {
                  setLimit(7);
                }}
                variant={limit === 7 ? "contained" : "outlined"}
              >
                7 dní
              </Button>
              <Button
                onClick={() => {
                  setLimit(30);
                }}
                variant={limit === 30 ? "contained" : "outlined"}
              >
                30 dní
              </Button>
              <Button
                onClick={() => {
                  setLimit(90);
                }}
                variant={limit === 90 ? "contained" : "outlined"}
              >
                90 dní
              </Button>
              <Button
                onClick={() => {
                  setLimit(0);
                  setQueryLimit(0);
                }}
                variant={limit === 0 ? "contained" : "outlined"}
              >
                Vše
              </Button>
            </ButtonGroup>
          </Box>
        }
        title={obec_nazev}
      />
      <CardContent>
        {obec.loading ? (
          <Box>
            <CircularProgress text-align="center" color="primary" size={50} />
          </Box>
        ) : (
          <>
            <Box mb={2}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      Aktuálně nemocných (
                      {new Date(obec.data.obec[0].datum).toLocaleDateString(
                        "cs-CZ",
                        {
                          day: "numeric",
                          month: "numeric",
                        }
                      )}
                      )
                    </TableCell>
                    <TableCell align="center">
                      Nové případy (
                      {new Date(obec.data.obec[1].datum).toLocaleDateString(
                        "cs-CZ",
                        {
                          day: "numeric",
                          month: "numeric",
                        }
                      )}
                      )
                    </TableCell>
                    <TableCell align="center">Změna za 7 dní</TableCell>
                    <TableCell align="center">Změna za 30 dní</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" align="center">
                      {obec.data.obec[0].aktualne_nemocnych}
                    </TableCell>
                    <TableCell align="center">
                      {obec.data.obec[1].nove_pripady}
                    </TableCell>
                    <TableCell align="center">
                      {obec.data.obec[0].aktualne_nemocnych -
                        obec.data.obec[6].aktualne_nemocnych}
                    </TableCell>
                    <TableCell align="center">
                      {obec.data.obec[0].aktualne_nemocnych -
                        obec.data.obec[29].aktualne_nemocnych}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
            <Chart data={convertToGraphData(obec.data.obec)} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
