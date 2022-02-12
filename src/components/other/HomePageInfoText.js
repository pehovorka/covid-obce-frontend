import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import WbIncandescentTwoToneIcon from "@mui/icons-material/WbIncandescentTwoTone";
import { Alert } from ".";

function HomePageInfoText() {
  return (
    <Box textAlign="center" my={5}>
      <Grid container direction="row" spacing={3}>
        <Grid item xs={12} sm={4}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <Grid item>
              <WbIncandescentTwoToneIcon
                style={{ transform: "scaleY(-1)", color: "#dbc21a" }}
              />
            </Grid>
            <Grid item>
              <Typography variant="body2">
                Přidejte až 10 obcí, řadit je můžete přetažením. Seznam obcí vám
                zůstane uložený do příští návštěvy.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm>
          <Alert activeCasesDisclaimer variant="outlined" noMargin />
        </Grid>
      </Grid>
    </Box>
  );
}

HomePageInfoText.propTypes = {};

export default HomePageInfoText;
