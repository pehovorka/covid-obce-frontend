import React from "react";
import { Box } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TownCard } from "../components/TownCard";
import { useMunicipalitiesDispatch } from "../contexts/MunicipalitiesProvider";
import { CHANGE_ORDER } from "../utils/municipalitiesReducer";

export function DragAndDropCards({ municipalities }) {
  const dispatch = useMunicipalitiesDispatch();
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(municipalities);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch({ type: CHANGE_ORDER, newOrder: items });
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="towns">
        {(provided) => (
          <Box {...provided.droppableProps} ref={provided.innerRef} mt={1}>
            {municipalities.map((municipality, index) => (
              <Draggable
                key={municipality.obec_kod}
                draggableId={municipality.obec_kod}
                index={index}
              >
                {(provided) => (
                  <Box
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    p={1}
                  >
                    <TownCard
                      obec_nazev={municipality.obec_nazev}
                      obec_kod={municipality.obec_kod}
                      limit={municipality.limit}
                      index={index}
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
