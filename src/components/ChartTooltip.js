import React from "react";
import { Box, Paper, Grid, Typography, Divider } from "@material-ui/core/";

export const ChartTooltip = ({ active, payload, label }) => {
  //console.log(payload);
  const date = new Date(label);
  const stringDate = date.toLocaleDateString("cs-CZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  if (active && payload && payload.length) {
    return (
      <Paper
        className="custom-tooltip"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
      >
        <Box p={1} minWidth="15rem">
          <Typography variant="h6" align="center">
            {stringDate}
          </Typography>
          <Divider />
          <Box pt={1}>
            <Typography
              variant="body1"
              style={{
                fontWeight: 500,
                color: payload[0].color,
                lineHeight: "1.2rem",
              }}
            >
              <Grid container justify="space-between">
                <Grid item>{payload[0].name} </Grid>
                <Grid item>
                  {parseInt(payload[0].value).toLocaleString("cs-CZ")}
                </Grid>
              </Grid>
            </Typography>
            <Typography
              variant="body1"
              style={{ fontWeight: 500, color: payload[2]?.color }}
            >
              Nové případy
            </Typography>
            <Box>
              <Typography variant="body2" style={{ fontWeight: 500 }}>
                <Grid container justify="flex-start" direction="row">
                  <Grid item>
                    <Box
                      width="2rem"
                      height="100%"
                      style={{
                        background:
                          "linear-gradient(148deg, " +
                          payload[2]?.color +
                          ", " +
                          payload[2]?.color +
                          " 50%, " +
                          payload[1].color +
                          " 50%, " +
                          payload[1].color +
                          ")",
                      }}
                    />
                  </Grid>
                  <Grid item style={{ marginLeft: "0.8rem" }}>
                    Celkem{" "}
                  </Grid>
                  <Grid item style={{ marginLeft: "auto" }}>
                    {(
                      parseInt(payload[1].value) + parseInt(payload[2]?.value)
                    ).toLocaleString("cs-CZ")}
                  </Grid>
                </Grid>
              </Typography>
              <Grid container justify="flex-start" direction="row">
                <Grid item>
                  <Box
                    width="2rem"
                    height="100%"
                    style={{ backgroundColor: payload[2]?.color }}
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.8rem" }}>
                  <Typography variant="body2">{payload[2]?.name} </Typography>
                </Grid>
                <Grid item style={{ marginLeft: "auto" }}>
                  <Typography variant="body2">
                    {parseInt(payload[2]?.value).toLocaleString("cs-CZ")}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justify="flex-start" direction="row">
                <Grid item>
                  <Box
                    width="2rem"
                    height="100%"
                    style={{ backgroundColor: payload[1].color }}
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0.8rem" }}>
                  <Typography variant="body2">{payload[1].name} </Typography>
                </Grid>
                <Grid item style={{ marginLeft: "auto" }}>
                  <Typography variant="body2">
                    {parseInt(payload[1].value).toLocaleString("cs-CZ")}
                  </Typography>
                </Grid>
              </Grid>
              {payload[3] && (
                <Grid container justify="flex-start" direction="row">
                  <Grid item>
                    <Box
                      width="2rem"
                      height="100%"
                      style={{ backgroundColor: payload[3].color }}
                    />
                  </Grid>
                  <Grid item style={{ marginLeft: "0.8rem" }}>
                    <Typography variant="body2">{payload[3].name} </Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: "auto" }}>
                    <Typography variant="body2">
                      {parseFloat(payload[3].value).toLocaleString("cs-CZ")}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    );
  }

  return null;
};
