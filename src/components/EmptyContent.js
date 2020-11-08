import React from "react";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

export function EmptyContent({ inputRef }) {
  return (
    <Paper>
      <Box p={6} m={2} textAlign="center">
        <Grid container direction="column" spacing={5}>
          <Grid item>
            <Typography variant="h4" component="h2">
              Sledujte vývoj šíření nákazy ve vaší obci
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
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => {
                inputRef.current.focus();
                //inputRef.current.style =
                //  "box-shadow: 0 0 0 99999px rgba(0, 0, 0, .5)";
                //(inputRef);
              }}
            >
              Přidat první obec
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
