import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";

import { isValidMunicipalityCode, OBEC_NAZEV_QUERY } from "../utils/shareUtils";
import { PageNotFound } from "./PageNotFound";

export function MunicipalityDetailPage() {
  const [municipality, setMunicipality] = useState({
    obec_nazev: "",
    obec_kod: "",
  });
  const [error, setError] = useState(null);
  const urlParams = useParams();
  const [getMunicipalityName, { called, loading, data }] = useLazyQuery(
    OBEC_NAZEV_QUERY
  );

  useEffect(() => {
    if (urlParams.obec_kod) {
      const requiredMunicipalityCode = urlParams.obec_kod;
      //Call query here
      if (isValidMunicipalityCode(requiredMunicipalityCode)) {
        getMunicipalityName({
          variables: { obec_kod: requiredMunicipalityCode, limit: 1 },
        });
      } else {
        setError("Špatně zadaný formát kódu obce!");
      }
    }
  }, [getMunicipalityName, urlParams.obec_kod]);

  useEffect(() => {
    if (called && !loading && data.obec.length === 1) {
      console.log("Success!");
      setMunicipality({
        obec_kod: data.obec[0].obec_kod,
        obec_nazev: data.obec[0].obec_nazev,
      });

      //console.log(data.obec[0].obec_kod);

      //addNewTown(data.obec[0].obec_kod, data.obec[0].obec_nazev);
    } else if (called && !loading && data.obec.length === 0) {
      setError("Obec s tímto kódem neexistuje!");
    }
  }, [called, loading, data]);

  if (error) {
    return <PageNotFound message={error} />;
  }
  return <h1>{municipality.obec_nazev}</h1>;
}
