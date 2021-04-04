import React, { lazy, Suspense } from "react";
import { Box, Grid, Divider, Typography } from "@material-ui/core/";
import {
  formatNumberToDisplay,
  formatChangeNumberToDisplay,
} from "../utils/municipalityUtils";

const ActivePer1000 = lazy(() => import("./ActivePer1000"));

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
                    Aktivní případy (
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
                Aktivní na 1000 obyvatel (
                {new Date(obec.data.obec[0].datum).toLocaleDateString("cs-CZ", {
                  day: "numeric",
                  month: "numeric",
                })}
                )
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" component="p">
                <Suspense fallback="...">
                  <ActivePer1000
                    activeCases={obec.data.obec[0].aktualne_nemocnych}
                    municipalityCode={code}
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
