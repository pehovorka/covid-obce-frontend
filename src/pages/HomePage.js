import React, { useEffect, useRef } from "react";
import { Container, Box, Typography, Grid } from "@material-ui/core";
import WbIncandescentTwoToneIcon from "@material-ui/icons/WbIncandescentTwoTone";

import { PrimarySearchAppBar } from "../components/AppBar";
import { DragAndDropCards } from "../components/DragAndDropCards";
import { Footer } from "../components/Footer";
import { EmptyContent } from "../components/EmptyContent";
import { useMunicipalitiesState } from "../providers/MunicipalitiesProvider";

export function HomePage(props) {
  const { municipalities } = useMunicipalitiesState();

  const inputRef = useRef(null);

  const searchAutoFocus = props.location.state?.searchAutoFocus ?? false;

  document.title = `COVID v obcích`;

  useEffect(() => {
    if (searchAutoFocus) {
      inputRef.current.focus();
    }
  }, [searchAutoFocus]);

  return (
    <>
      <PrimarySearchAppBar inputRef={inputRef} searchEnabled={true} />
      <Container component="main">
        {municipalities.length === 0 ? (
          <EmptyContent inputRef={inputRef} />
        ) : (
          <>
            <DragAndDropCards municipalities={municipalities} />
            <Box textAlign="center" mt={2}>
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
            </Box>
          </>
        )}
        <Box p={3} textAlign={"center"}>
          <Footer />
        </Box>
      </Container>
    </>
  );
}
