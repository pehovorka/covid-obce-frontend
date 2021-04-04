import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Box,
  Grid,
  Link,
  Toolbar,
  Typography,
} from "@material-ui/core/";
import { Link as RouterLink } from "react-router-dom";

import { SearchField } from "./SearchField";
import { SearchButton } from "./SearchButton";
import { route } from "../Routes";

const useStyles = makeStyles((theme) => ({
  search: {
    color: "#fff",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  appBar: {
    minHeight: "72px",
  },
}));

export function PrimarySearchAppBar({ inputRef, searchEnabled }) {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.appBar}>
        <Box width="100%" pt={1} pb={1}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs sm={5} md={3} lg={2}>
              <Grid container spacing={1}>
                <Grid item>
                  <img
                    src={process.env.PUBLIC_URL + "/logo.svg"}
                    alt="Logo"
                    height="30px"
                    width="30px"
                    style={{ fill: "#fff" }}
                  />
                </Grid>
                <Grid item>
                  <Link
                    to={route.home()}
                    component={RouterLink}
                    color="inherit"
                    underline="none"
                  >
                    <Typography
                      className={classes.title}
                      variant="h6"
                      component="h1"
                      noWrap
                    >
                      COVID v obcích
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            {searchEnabled ? (
              <Grid item xs={12} sm={7} md={9} lg={10}>
                <div className={classes.search}>
                  <SearchField inputRef={inputRef} />
                </div>
              </Grid>
            ) : (
              <Grid item xs={6}>
                <Box textAlign="right">
                  <SearchButton />
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
