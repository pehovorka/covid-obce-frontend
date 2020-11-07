import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";

import { PrimarySearchAppBar } from "../components/AppBar";
import { TownCard } from "../components/TownCard";

export function HomePage() {
  const [selectedTowns, setSelectedTowns] = useState(
    JSON.parse(localStorage.getItem("obce")) || []
  );

  console.log(selectedTowns);
  /*   useEffect(() => {
    setSelectedTowns(localStorage.getItem("obce"));
  }, []); */

  useEffect(() => {
    localStorage.setItem("obce", JSON.stringify(selectedTowns));
  }, [selectedTowns]);

  const addNewTown = (obec_kod, obec_nazev) => {
    setSelectedTowns((selectedTowns) => [
      ...selectedTowns,
      { obec_kod: obec_kod, obec_nazev: obec_nazev },
    ]);
  };

  return (
    <>
      <PrimarySearchAppBar
        selectedTowns={selectedTowns}
        setSelectedTowns={setSelectedTowns}
        addNewTown={addNewTown}
      />
      <Container component="main">
        {selectedTowns.map((selectedTown) => (
          <TownCard
            obec_nazev={selectedTown.obec_nazev}
            obec_kod={selectedTown.obec_kod}
            key={selectedTown.obec_kod}
          />
        ))}
      </Container>
    </>
  );
}
