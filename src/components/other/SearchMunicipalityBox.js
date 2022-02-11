import React from "react";
import { Grid, Typography } from "@mui/material";

import { SearchButton } from "../layout";

function SearchMunicipalityBox() {
  return (
    <Grid
      container
      direction="column"
      alignContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Typography variant="body1" textAlign="center">
          Chcete najít jinou obec?
        </Typography>
      </Grid>
      <Grid item>
        <SearchButton text="Vyhledat" />
      </Grid>
    </Grid>
  );
}

SearchMunicipalityBox.propTypes = {};

export default SearchMunicipalityBox;
