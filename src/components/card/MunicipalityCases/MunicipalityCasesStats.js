import React from "react";
import { Box, Grid, Divider, Typography } from "@material-ui/core/";
import { Skeleton } from "@material-ui/lab";

import {
  formatNumberToDisplay,
  formatChangeNumberToDisplay,
} from "../../../utils/municipalityUtils";

import { ActivePer1000 } from ".";
const skeletonWidth = 100;

export default function MunicipalityCasesStats({ municipality, code }) {
  const days = municipality.data?.municipalityCases.days;
  return (
    <Box mb={2}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} lg={7}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Typography variant="overline" noWrap={true}>
                    Aktivní případy
                    {municipality.data &&
                      " (" +
                        new Date(days[days.length - 1].d).toLocaleDateString(
                          "cs-CZ",
                          {
                            day: "numeric",
                            month: "numeric",
                          }
                        ) +
                        ")"}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" component="p">
                    {municipality.data ? (
                      formatNumberToDisplay(days[days.length - 1].ac)
                    ) : (
                      <Skeleton width={skeletonWidth} />
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
                    {municipality.data ? (
                      formatChangeNumberToDisplay(
                        days[days.length - 1].ac - days[days.length - 8].ac
                      )
                    ) : (
                      <Skeleton width={skeletonWidth} />
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
                    {municipality.data ? (
                      formatChangeNumberToDisplay(
                        days[days.length - 1].ac - days[days.length - 31].ac
                      )
                    ) : (
                      <Skeleton width={skeletonWidth} />
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
                Aktivní na 1000 obyvatel
                {municipality.data &&
                  " (" +
                    new Date(days[days.length - 1].d).toLocaleDateString(
                      "cs-CZ",
                      {
                        day: "numeric",
                        month: "numeric",
                      }
                    ) +
                    ")"}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" component="p">
                {municipality.data ? (
                  <ActivePer1000
                    activeCases={days[days.length - 1].ac}
                    municipalityPopulation={
                      municipality.data?.municipalityCases
                        .municipalityPopulation
                    }
                  />
                ) : (
                  <Skeleton width={skeletonWidth} />
                )}
              </Typography>
            </Grid>
          </Grid>
          <Box mt={1}>
            <Divider />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
