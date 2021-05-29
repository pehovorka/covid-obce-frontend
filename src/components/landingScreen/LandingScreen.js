import React from "react";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import townImage from "../../assets/czechTown.svg";
import { useStyles } from "./LandingScreen.style";

export default function LandingScreen({ inputRef }) {
  const classes = useStyles();
  return (
    <Box className={classes.container} component="main">
      <Container>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Box className={classes.textContainer}>
              <Typography variant="h4" component="h2" className={classes.title}>
                Kolik pozitivně testovaných osob na{" "}
                <span className={classes.noWrap}>COVID-19</span> je ve vaší
                obci?
              </Typography>

              <Typography
                variant="subtitle1"
                component="p"
                className={classes.subtitle}
              >
                V celém Česku bylo od začátku pandemie potvrzeno již více než
                milion a půl případů. Podívejte se, jak se koronavirová nákaza
                šíří ve vaší obci. Přehledné grafy vám ukážou historický vývoj
                i aktuální situaci, stačí vyhledat název obce v záhlaví stránky.
              </Typography>

              <Button
                className={classes.button}
                variant="contained"
                size="large"
                disableElevation={true}
                startIcon={<SearchIcon />}
                onClick={() => {
                  inputRef.current.focus();
                }}
              >
                Vyhledat obec
              </Button>
            </Box>
          </Grid>
          <Grid item xs={10} md={6}>
            <img
              src={townImage}
              className={classes.image}
              alt="Obec"
              width="616"
              height="616"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
