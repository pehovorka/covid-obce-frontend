import React, { useState, useEffect } from "react";
import { Container, Box } from "@material-ui/core";
import { AppBar, Footer } from "../components/layout";

import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";

import { isValidMunicipalityCode } from "../utils/municipalityUtils";
import { MUNICIPALITY_NAME_QUERY } from "../utils/queries";
import { NotFoundPage } from ".";
import { Alert, LoadingIndicator } from "../components";
import { MunicipalityCard } from "../components/card";
import { useMunicipalitiesDispatch } from "../providers/MunicipalitiesProvider";
import { SET_SNACKBAR_MESSAGE } from "../utils/municipalitiesReducer";

export function MunicipalityDetailPage() {
  const dispatch = useMunicipalitiesDispatch();
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(90);
  const urlParams = useParams();

  const [getMunicipalityName, municipalityName] = useLazyQuery(
    MUNICIPALITY_NAME_QUERY
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
    } else if (municipalityName.error) {
      dispatch({
        type: SET_SNACKBAR_MESSAGE,
        text: "Nepodařilo se připojit k serveru. Zkuste to prosím později.",
        severity: "error",
      });
    }
  }, [municipalityName, dispatch]);

  const handleDateLimitChange = ({ select }) => {
    setLimit(select.target.value);
  };

  if (error) {
    return <NotFoundPage message={error} />;
  } else
    return (
      <>
        <AppBar />
        <Container>
          {!municipalityName.data || !municipalityName.called ? (
            <LoadingIndicator />
          ) : municipalityName.data?.obec?.length === 0 ? (
            <NotFoundPage message={error} />
          ) : (
            <>
              <Box my={4}>
                <MunicipalityCard
                  name={municipalityName.data?.obec[0]?.obec_nazev}
                  code={urlParams.code}
                  closeButtonHidden={true}
                  handleDateLimitChange={handleDateLimitChange}
                  limit={limit}
                />
              </Box>
              <Alert activeCasesDisclaimer variant="outlined" />
            </>
          )}
        </Container>
        <Footer />
      </>
    );
}
