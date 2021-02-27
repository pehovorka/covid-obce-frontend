import React, { useState, useEffect } from "react";
import { Container, Box } from "@material-ui/core";
import { Footer } from "../components/Footer";
import { PrimarySearchAppBar } from "../components/AppBar";

import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";

import {
  isValidMunicipalityCode,
  OBEC_NAZEV_QUERY,
} from "../utils/municipalityUtils";
import { PageNotFound } from "./PageNotFound";

import { LoadingIndicator } from "../components/LoadingIndicator";
import { TownCard } from "../components/TownCard";

export function MunicipalityDetailPage() {
  const [error, setError] = useState(null);
  const urlParams = useParams();

  const [getMunicipalityName, municipalityName] = useLazyQuery(
    OBEC_NAZEV_QUERY
  );

  useEffect(() => {
    if (urlParams.code) {
      const requiredMunicipalityCode = urlParams.code;
      //Call query here
      if (isValidMunicipalityCode(requiredMunicipalityCode)) {
        !municipalityName.called &&
          getMunicipalityName({
            variables: {
              obec_kod: requiredMunicipalityCode,
              limit: 1,
            },
            fetchPolicy: "cache-first",
          });
      } else if (!isValidMunicipalityCode(requiredMunicipalityCode)) {
        setError("Špatně zadaný formát kódu obce!");
      }
    }
  }, [getMunicipalityName, urlParams, municipalityName]);

  useEffect(() => {
    if (municipalityName.data && municipalityName.data.obec.length === 0) {
      setError("Obec s tímto kódem neexistuje!");
    } else if (municipalityName.data) {
      document.title = `${municipalityName.data.obec[0].obec_nazev} – COVID v obcích`;
    }
  }, [municipalityName]);

  if (error) {
    return <PageNotFound message={error} />;
  } else
    return (
      <>
        <PrimarySearchAppBar />
        <Container>
          {!municipalityName.data || !municipalityName.called ? (
            <LoadingIndicator />
          ) : municipalityName.data?.obec?.length === 0 ? (
            <PageNotFound message={error} />
          ) : (
            <>
              <Box mt={6}>
                <TownCard
                  name={municipalityName.data?.obec[0]?.obec_nazev}
                  code={urlParams.code}
                  closeButtonHidden={true}
                />
              </Box>
              <Box mt={10}>
                <Footer />
              </Box>
            </>
          )}
        </Container>
      </>
    );
}
