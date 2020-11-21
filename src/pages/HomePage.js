import React, { useEffect, useState, useRef } from "react";
import { Container, Box, Typography, Grid } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import WbIncandescentTwoToneIcon from "@material-ui/icons/WbIncandescentTwoTone";

import { PrimarySearchAppBar } from "../components/AppBar";
import { TownCard } from "../components/TownCard";
import { Footer } from "../components/Footer";
import { EmptyContent } from "../components/EmptyContent";
import { SnackBar } from "../components/SnackBar";

export function HomePage() {
  const [selectedTowns, setSelectedTowns] = useState(
    JSON.parse(localStorage.getItem("obce")) || []
  );

  const inputRef = useRef(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState();

  useEffect(() => {
    localStorage.setItem("obce", JSON.stringify(selectedTowns));
    const gaItems = selectedTowns.map((selectedTown) => {
      const container = {};

      container.item_id = selectedTown.obec_kod;
      container.item_name = selectedTown.obec_nazev;
      return container;
    });
    window.gtag("event", "view_item_list", {
      items: gaItems,
    });
  }, [selectedTowns]);

  const addNewTown = (obec_kod, obec_nazev) => {
    if (selectedTowns.some((e) => e.obec_kod === obec_kod)) {
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
          { obec_kod: obec_kod, obec_nazev: obec_nazev },
          ...selectedTowns,
        ]);
      }
    }
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(selectedTowns);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedTowns(items);
  };

  const handleClose = (index) => {
    const items = Array.from(selectedTowns);
    items.splice(index, 1);
    setSelectedTowns(items);
  };

  return (
    <>
      <PrimarySearchAppBar
        selectedTowns={selectedTowns}
        setSelectedTowns={setSelectedTowns}
        addNewTown={addNewTown}
        inputRef={inputRef}
      />
      <Container component="main">
        {selectedTowns.length === 0 ? (
          <EmptyContent inputRef={inputRef} />
        ) : (
          <>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="towns">
                {(provided) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    mt={1}
                  >
                    {selectedTowns.map((selectedTown, index) => (
                      <Draggable
                        key={selectedTown.obec_kod}
                        draggableId={selectedTown.obec_kod}
                        index={index}
                      >
                        {(provided) => (
                          <Box
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            p={1}
                          >
                            <TownCard
                              obec_nazev={selectedTown.obec_nazev}
                              obec_kod={selectedTown.obec_kod}
                              index={index}
                              handleClose={handleClose}
                              provided={provided}
                            />
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
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
