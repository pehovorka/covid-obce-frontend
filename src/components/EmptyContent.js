import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import townImage from "../assets/czechTown.svg";

export function EmptyContent({ inputRef }) {
  const classes = useStyles();
  return (
    <Box className={classes.container} component="main">
      <Container>
        <Grid container direction="row" justify="center">
          <Grid item xs={12} md={6}>
            <Box className={classes.textContainer}>
              <Typography variant="h4" component="h2" className={classes.title}>
                Kolik pozitivně testovaných osob na COVID-19 je ve vaší obci?
              </Typography>

              <Typography
                variant="subtitle1"
                component="p"
                className={classes.subtitle}
              >
                V celém Česku bylo od začátku pandemie protvrzeno již více než
                milion a půl případů. Podívejte se, jak se koronavirová nákaza
                šíří ve vaší obci. Přehledné grafy vám ukážou historický vývoj i
                aktuální situaci, stačí vyhledat název obce v záhlaví této
                stránky.
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
          <Grid item xs={10} md={6} className={classes.image}>
            <img src={townImage} alt="Obec" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    background:
      "linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);",
    //minHeight: "calc(100vh - 72px)",
    boxShadow: "inset 0 7px 9px -7px rgba(0,0,0,0.4)",
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(10),
    },
  },
  textContainer: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(12),
    },
  },
  title: {
    color: theme.palette.primary.dark,
    fontWeight: "900",
    fontSize: "1.75rem",
    marginBottom: "2rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "2.5rem",
      marginBottom: "4rem",
    },
  },
  subtitle: {
    fontSize: "1rem",
    fontWeight: "400",
    marginBottom: "2rem",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2rem",
      marginBottom: "4rem",
      width: "70%",
    },
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 12,
    height: "2.5rem",
    minWidth: "50%",
    [theme.breakpoints.up("sm")]: {
      height: 50,
      minWidth: "40%",
    },
  },
}));
