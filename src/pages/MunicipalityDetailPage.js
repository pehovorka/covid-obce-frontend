import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";

import { isValidMunicipalityCode, OBEC_NAZEV_QUERY } from "../utils/shareUtils";

export function MunicipalityDetailPage() {
  const [municipality, setMunicipality] = useState({
    obec_nazev: "",
    obec_kod: "",
  });
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
    }
  }, [called, loading, data]);

  return <h1>{municipality.obec_nazev}</h1>;
}
