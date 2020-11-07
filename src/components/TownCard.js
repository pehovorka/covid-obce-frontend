import React from "react";
import { gql, useQuery } from "@apollo/client";
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core/";

import { Chart } from "./Chart";

const OBEC_DETAIL_QUERY = gql`
  query Obec($obec_kod: String!) {
    obec(obec_kod: $obec_kod) {
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
  const obec = useQuery(OBEC_DETAIL_QUERY, {
    variables: { obec_kod },
    fetchPolicy: "cache-first",
  });

  const convertToGraphData = (stringData) => {
    const graphData = stringData.map((item) => {
      const container = {};
      container.datum = new Date(item.datum).toLocaleDateString("cs-CZ", {});
      container.aktualne_nemocnych = parseInt(item.aktualne_nemocnych);
      return container;
    });
    return graphData;
  };

  //console.log(obecData[obecData.length - 1].aktualne_nemocnych);
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {obec_nazev}
        </Typography>
        {obec.loading ? (
          <CircularProgress color="primary" size={20} />
        ) : (
          <>
            <div>
              Aktuálně nemocných:{" "}
              {obec.data.obec[obec.data.obec.length - 1].aktualne_nemocnych}
            </div>
            <Chart data={convertToGraphData(obec.data.obec)} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
