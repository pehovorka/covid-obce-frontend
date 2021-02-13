import React from "react";
import { Box } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TownCard } from "../components/TownCard";

export function DragAndDropCards({ selectedTowns, setSelectedTowns }) {
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
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="towns">
        {(provided) => (
          <Box {...provided.droppableProps} ref={provided.innerRef} mt={1}>
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
                      limit={selectedTown.limit}
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
  );
}
