import React from "react";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export function EmptyContent({ inputRef }) {
  return (
    <Paper>
      <Box p={6} m={2} textAlign="center">
        <Grid container direction="column" spacing={5}>
          <Grid item>
            <Typography variant="h5" component="h2">
              Sledujte vývoj počtu lidí s prokázaným onemocněním COVID-19 ve
              vaší obci.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" component="p">
              Začněte vyhledáním obce v záhlaví stránky.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              disableElevation={true}
              startIcon={<SearchIcon />}
              onClick={() => {
                inputRef.current.focus();
              }}
            >
              Vyhledat první obec
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
