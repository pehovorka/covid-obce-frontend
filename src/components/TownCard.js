import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core/";

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

  const [obecData, setObecData] = useState([]);

  useEffect(() => {
    if (!obec.loading && !obec.error) {
      console.log(obec.data.obec);
      setObecData(obec.data.obec);
    }
  }, [obec.data, obec.loading, obec.error]);

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
        {obec.loading || obecData === [] ? (
          <CircularProgress color="primary" size={20} />
        ) : (
          <div>
            Aktuálně nemocných:{" "}
            {obec.data.obec[obec.data.obec.length - 1].aktualne_nemocnych}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
