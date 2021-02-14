import React, { useEffect, useState, useRef } from "react";
import { Container, Box, Typography, Grid } from "@material-ui/core";
import WbIncandescentTwoToneIcon from "@material-ui/icons/WbIncandescentTwoTone";

import { PrimarySearchAppBar } from "../components/AppBar";
import { DragAndDropCards } from "../components/DragAndDropCards";
import { Footer } from "../components/Footer";
import { EmptyContent } from "../components/EmptyContent";
import { SnackBar } from "../components/SnackBar";
import {
  useMunicipalitiesDispatch,
  useMunicipalitiesState,
} from "../contexts/MunicipalitiesProvider";

export function HomePage(props) {
  /*   const [selectedTowns, setSelectedTowns] = useState(
    JSON.parse(localStorage.getItem("obce")) || []
  ); */

  const municipalities = useMunicipalitiesState();
  const dispatch = useMunicipalitiesDispatch();

  const inputRef = useRef(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState();

  const searchAutoFocus = props.location.state?.searchAutoFocus ?? false;

  document.title = `COVID v obcích`;

  // [{obec_kod: "548511", obec_nazev: "Pacov"}, {obec_kod: "554782", obec_nazev: "Praha"}]

  /* 
  const addNewTown = (obec_kod, obec_nazev) => {
    if (isAlreadyAdded(obec_kod)) {
      setSnackBarOpen(true);
      setSnackBarMessage("Tato obec již byla přidána!");
    } else {
      if (selectedTowns.length === 10) {
        setSnackBarOpen(true);
        setSnackBarMessage(
          "Dosáhli jste maximálního počtu přidaných obcí. Pokud chcete vyhledat další obec, nějakou odeberte."
        );
      } else {
        setSelectedTowns((selectedTowns) => [
          { obec_kod: obec_kod, obec_nazev: obec_nazev, limit: 90 },
          ...selectedTowns,
        ]);
      }
    }
  }; */

  useEffect(() => {
    if (searchAutoFocus) {
      inputRef.current.focus();
    }
  }, [searchAutoFocus]);

  return (
    <>
      <PrimarySearchAppBar
        selectedTowns={municipalities}
        addNewTown={"addNewTown"}
        inputRef={inputRef}
        searchEnabled={true}
      />
      <Container component="main">
        {municipalities.length === 0 ? (
          <EmptyContent inputRef={inputRef} />
        ) : (
          <>
            <DragAndDropCards
              selectedTowns={municipalities}
              setSelectedTowns={"setSelectedTowns"}
            />
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
      <SnackBar
        message={snackBarMessage}
        severity="error"
        open={snackBarOpen}
        setOpen={setSnackBarOpen}
      />
    </>
  );
}
