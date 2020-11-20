import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  Box,
  CircularProgress,
  Card,
  CardContent,
  makeStyles,
  CardHeader,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  FormControl,
  MenuItem,
  Select,
  IconButton,
  Grid,
} from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";

import { Chart } from "./Chart";

const OBEC_DETAIL_QUERY = gql`
  query Obec($obec_kod: String!, $limit: Int!) {
    obec(obec_kod: $obec_kod, limit: $limit) {
      datum
      aktualne_nemocnych
      nove_pripady
    }
  }
`;

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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

export function TownCard({
  obec_nazev,
  obec_kod,
  handleClose,
  index,
  provided,
}) {
  const [limit, setLimit] = useState(90);
  const [queryLimit, setQueryLimit] = useState(90);
  const obec = useQuery(OBEC_DETAIL_QUERY, {
    variables: { obec_kod, limit: queryLimit },
    fetchPolicy: "cache-first",
  });

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

  const handleDateLimitChange = (result) => {
    //console.log(result.target.value);
    setLimit(result.target.value);
    if (result.target.value === 0) {
      setQueryLimit(0);
    }
  };

  const formatNumberToDisplay = (number) => {
    let result = (number > 0 ? "+" : "") + number;
    return result;
  };

  /*   useEffect(() => {
    console.log("Firing view_item event", obec_kod, obec_nazev);
    window.gtag("event", "view_item", {
      items: [{ item_id: obec_kod, item_name: obec_nazev }],
    });
  }, [obec_kod, obec_nazev]); */

  //console.log(obecData[obecData.length - 1].aktualne_nemocnych);
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        {...provided.dragHandleProps}
        action={
          <Box>
            <Grid
              container
              alignItems="center"
              justify="flex-end"
              spacing={1}
              direction="row"
            >
              <Grid item xs={7}>
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={limit}
                    onChange={handleDateLimitChange}
                  >
                    <MenuItem value={7}>7 dní</MenuItem>
                    <MenuItem value={30}>30 dní</MenuItem>
                    <MenuItem value={90}>90 dní</MenuItem>
                    <MenuItem value={0}>Vše</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleClose(index)}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        }
        title={obec_nazev}
      />
      <CardContent>
        {obec.loading || obec.error ? (
          <Box
            height={426}
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box>
              <CircularProgress size={50} />
            </Box>
          </Box>
        ) : (
          <>
            <Box mb={2}>
              <Table
                className={classes.table}
                aria-label="Tabulka s vývojem počtu nakažených"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" width="33.3%">
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
                    <TableCell align="center" width="33.3%">
                      Změna za 7 dní
                    </TableCell>
                    <TableCell align="center" width="33.3%">
                      Změna za 30 dní
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      {obec.data.obec[0].aktualne_nemocnych}
                    </TableCell>
                    <TableCell align="center">
                      {formatNumberToDisplay(
                        obec.data.obec[0].aktualne_nemocnych -
                          obec.data.obec[6].aktualne_nemocnych
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {formatNumberToDisplay(
                        obec.data.obec[0].aktualne_nemocnych -
                          obec.data.obec[29].aktualne_nemocnych
                      )}
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
