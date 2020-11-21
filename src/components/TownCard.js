import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  Box,
  CircularProgress,
  Card,
  CardContent,
  makeStyles,
  CardHeader,
  FormControl,
  MenuItem,
  Select,
  IconButton,
  Grid,
  Divider,
  Typography,
} from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";

import { Chart } from "./Chart";
import municipalitiesPopulation from "../assets/municipalitiesPopulation.json";

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
    let result = parseInt(number).toLocaleString("cs-CZ");
    return result;
  };

  const formatChangeNumberToDisplay = (number) => {
    let result =
      (number > 0 ? "+ " : number === 0 ? "" : "- ") +
      Math.abs(number).toLocaleString("cs-CZ");
    return result;
  };

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
            height={388}
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
              <Grid container spacing={3} justify="center">
                <Grid item xs={12} lg={7}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm>
                      <Grid container direction="column" alignItems="center">
                        <Grid item>
                          <Typography variant="overline" noWrap={true}>
                            Nemocných (
                            {new Date(
                              obec.data.obec[0].datum
                            ).toLocaleDateString("cs-CZ", {
                              day: "numeric",
                              month: "numeric",
                            })}
                            )
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="h6" component="p">
                            {formatNumberToDisplay(
                              obec.data.obec[0].aktualne_nemocnych
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm>
                      <Grid container direction="column" alignItems="center">
                        <Grid item>
                          <Typography variant="overline" noWrap={true}>
                            Změna za 7 dní
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="h6" component="p">
                            {formatChangeNumberToDisplay(
                              obec.data.obec[0].aktualne_nemocnych -
                                obec.data.obec[7].aktualne_nemocnych
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm>
                      <Grid container direction="column" alignItems="center">
                        <Grid item>
                          <Typography variant="overline" noWrap={true}>
                            Změna za 30 dní
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="h6" component="p">
                            {formatChangeNumberToDisplay(
                              obec.data.obec[0].aktualne_nemocnych -
                                obec.data.obec[30].aktualne_nemocnych
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Box mt={1}>
                    <Divider />
                  </Box>
                </Grid>
                <Grid item xs={12} lg={3}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item xs={12}>
                      <Typography variant="overline" noWrap={true}>
                        Nemocných na 1000 obyvatel (
                        {new Date(obec.data.obec[0].datum).toLocaleDateString(
                          "cs-CZ",
                          {
                            day: "numeric",
                            month: "numeric",
                          }
                        )}
                        )
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" component="p">
                        {(
                          (parseInt(obec.data.obec[0].aktualne_nemocnych) /
                            municipalitiesPopulation[0][obec_kod]) *
                          1000
                        ).toLocaleString("cs-CZ", { maximumFractionDigits: 1 })}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box mt={1}>
                    <Divider />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Chart data={convertToGraphData(obec.data.obec)} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
