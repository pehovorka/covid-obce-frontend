import React, { useEffect, useState } from "react";
import { Container, Box } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { PrimarySearchAppBar } from "../components/AppBar";
import { TownCard } from "../components/TownCard";

export function HomePage() {
  const [selectedTowns, setSelectedTowns] = useState(
    JSON.parse(localStorage.getItem("obce")) || []
  );

  useEffect(() => {
    localStorage.setItem("obce", JSON.stringify(selectedTowns));
  }, [selectedTowns]);

  const addNewTown = (obec_kod, obec_nazev) => {
    setSelectedTowns((selectedTowns) => [
      ...selectedTowns,
      { obec_kod: obec_kod, obec_nazev: obec_nazev },
    ]);
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
      />
      <Container component="main">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="towns">
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {selectedTowns.map((selectedTown, index) => (
                  <Draggable
                    key={selectedTown.obec_kod}
                    draggableId={selectedTown.obec_kod}
                    index={index}
                  >
                    {(provided) => (
                      <Box
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        p={1}
                      >
                        <TownCard
                          obec_nazev={selectedTown.obec_nazev}
                          obec_kod={selectedTown.obec_kod}
                          index={index}
                          handleClose={handleClose}
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
      </Container>
    </>
  );
}
