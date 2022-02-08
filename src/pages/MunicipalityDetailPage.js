import React, { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";

import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";

import { isValidMunicipalityCode } from "../utils/municipalityUtils";
import { MUNICIPALITY_NAME_QUERY } from "../utils/queries";
import { NotFoundPage } from ".";
import { Alert, LoadingIndicator } from "../components/other";
import { MunicipalityCard } from "../components/card";
import { useMunicipalitiesDispatch } from "../providers/MunicipalitiesProvider";
import { SET_SNACKBAR_MESSAGE } from "../utils/municipalitiesReducer";
import { AppBar, Footer } from "../components/layout";
import { Seo } from "../utils/Seo";

export default function MunicipalityDetailPage() {
  const dispatch = useMunicipalitiesDispatch();
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(90);
  const urlParams = useParams();
  const requiredMunicipalityCode = parseInt(urlParams.code);

  const [getMunicipalityNameResult, municipalityNameResult] = useLazyQuery(
    MUNICIPALITY_NAME_QUERY
  );

  useEffect(() => {
    if (urlParams.code) {
      //Call query here
      if (isValidMunicipalityCode(requiredMunicipalityCode)) {
        !municipalityNameResult.called &&
          getMunicipalityNameResult({
            variables: {
              municipalityId: requiredMunicipalityCode,
            },
            fetchPolicy: "cache-first",
          });
      } else if (!isValidMunicipalityCode(requiredMunicipalityCode)) {
        setError("Špatně zadaný formát kódu obce!");
      }
    }
  }, [
    getMunicipalityNameResult,
    urlParams,
    municipalityNameResult,
    requiredMunicipalityCode,
  ]);

  useEffect(() => {
    if (
      municipalityNameResult.data &&
      !municipalityNameResult.data.municipalityCases
    ) {
      setError("Obec s tímto kódem neexistuje!");
    } else if (municipalityNameResult.error) {
      dispatch({
        type: SET_SNACKBAR_MESSAGE,
        text: "Nepodařilo se připojit k serveru. Zkuste to prosím později.",
        severity: "error",
      });
    }
  }, [municipalityNameResult, dispatch]);

  const handleDateLimitChange = ({ select }) => {
    setLimit(select.target.value);
  };

  if (error) {
    return <NotFoundPage message={error} />;
  } else
    return (
      <>
        <Seo
          title={
            municipalityNameResult.data?.municipalityCases?.municipalityName
          }
        />
        <AppBar />
        <Container>
          {!municipalityNameResult.data || !municipalityNameResult.called ? (
            <LoadingIndicator />
          ) : municipalityNameResult.data?.municipalityCases?.length === 0 ? (
            <NotFoundPage message={error} />
          ) : (
            <>
              <Box my={4}>
                <MunicipalityCard
                  name={
                    municipalityNameResult.data?.municipalityCases
                      ?.municipalityName
                  }
                  code={requiredMunicipalityCode}
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
