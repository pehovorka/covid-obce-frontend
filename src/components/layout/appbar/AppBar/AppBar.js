import React from "react";
import {
  AppBar as MUIAppBar,
  Box,
  Grid,
  Link,
  Toolbar,
  Typography,
} from "@mui/material/";
import { Link as RouterLink } from "react-router-dom";

import { SearchButton, SearchField } from "../.";
import { useStyles } from "./AppBar.style";
import { route } from "../../../../Routes";
import MapButton from "../MapButton";

export default function AppBar({ inputRef, searchEnabled }) {
  const classes = useStyles();

  return (
    <MUIAppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.appBar}>
        <Box width="100%" pt={1} pb={1}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            columnSpacing={6}
            rowSpacing={1}
          >
            <Grid item order={{ xs: 1, md: 1 }}>
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
              <Grid item xs={12} md lg order={{ xs: 3, md: 2 }}>
                <div className={classes.search}>
                  <SearchField inputRef={inputRef} />
                </div>
              </Grid>
            ) : (
              <Grid item xs order={{ xs: 3, md: 2 }}>
                <Box>
                  <SearchButton />
                </Box>
              </Grid>
            )}
            <Grid item order={{ xs: 2, md: 3 }}>
              <Box textAlign="right">
                <MapButton />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
    </MUIAppBar>
  );
}
