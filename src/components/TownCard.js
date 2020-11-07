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
            <Box>
              Aktuálně nemocných: {obec.data.obec[0].aktualne_nemocnych}
            </Box>
            <Chart data={convertToGraphData(obec.data.obec)} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
