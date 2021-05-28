import React, { lazy, Suspense } from "react";
import { Box, Grid, Divider, Typography } from "@material-ui/core/";
import { Skeleton } from "@material-ui/lab";

import {
  formatNumberToDisplay,
  formatChangeNumberToDisplay,
} from "../../utils/municipalityUtils";

const ActivePer1000 = lazy(() => import("./ActivePer1000"));
const skeletonWidth = 100;

export function MunicipalityStats({ obec, code }) {
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
                    {obec.data &&
                      " (" +
                        new Date(obec.data.obec[0].datum).toLocaleDateString(
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
                    {obec.data ? (
                      formatNumberToDisplay(
                        obec.data.obec[0].aktualne_nemocnych
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
                    Změna za 7 dní
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" component="p">
                    {obec.data ? (
                      formatChangeNumberToDisplay(
                        obec.data.obec[0].aktualne_nemocnych -
                          obec.data.obec[7].aktualne_nemocnych
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
                    {obec.data ? (
                      formatChangeNumberToDisplay(
                        obec.data.obec[0].aktualne_nemocnych -
                          obec.data.obec[30].aktualne_nemocnych
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
                {obec.data &&
                  " (" +
                    new Date(obec.data.obec[0].datum).toLocaleDateString(
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
                <Suspense fallback={<Skeleton width={skeletonWidth} />}>
                  <ActivePer1000
                    activeCases={obec.data?.obec[0]?.aktualne_nemocnych}
                    municipalityCode={code}
                    skeletonWidth={skeletonWidth}
                  />
                </Suspense>
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
