import React, { useEffect, useRef } from "react";
import { Container, Box, Typography, Grid } from "@material-ui/core";
import WbIncandescentTwoToneIcon from "@material-ui/icons/WbIncandescentTwoTone";

import { AppBar, Footer } from "../components/layout";
import { DragAndDropCards } from "../components/card";
import { Alert, LandingScreen } from "../components/other";
import { useMunicipalitiesState } from "../providers/MunicipalitiesProvider";
import { Seo } from "../utils/Seo";

export default function HomePage(props) {
  const { municipalities } = useMunicipalitiesState();
  const inputRef = useRef(null);
  const searchAutoFocus = props.location.state?.searchAutoFocus ?? false;

  useEffect(() => {
    if (searchAutoFocus) {
      inputRef.current.focus();
    }
  }, [searchAutoFocus]);

  return (
    <>
      <Seo />
      <AppBar inputRef={inputRef} searchEnabled />
      {municipalities.length === 0 ? (
        <LandingScreen inputRef={inputRef} />
      ) : (
        <>
          <Container component="main">
            <Alert remote />
            <DragAndDropCards municipalities={municipalities} />
            <Box textAlign="center" mt={2} mb={8}>
              <Grid container alignItems="center" justify="center" spacing={1}>
                <Grid item>
                  <WbIncandescentTwoToneIcon
                    style={{ transform: "scaleY(-1)", color: "#dbc21a" }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    Přidejte až 10 obcí, řadit je můžete přetažením. Seznam obcí
                    vám zůstane uložený do příští návštěvy.
                  </Typography>
                </Grid>
              </Grid>
              <Alert activeCasesDisclaimer variant="outlined" />
            </Box>
          </Container>
        </>
      )}
      <Footer />
    </>
  );
}
