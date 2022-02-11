import React, { useEffect, useRef } from "react";
import { Container } from "@mui/material";

import { AppBar, Footer } from "../components/layout";
import { DragAndDropCards } from "../components/card";
import { Alert, LandingScreen, HomePageInfoText } from "../components/other";
import { useMunicipalitiesState } from "../providers/MunicipalitiesProvider";
import { Seo } from "../utils/Seo";

export default function HomePage(props) {
  const { municipalities } = useMunicipalitiesState();
  const inputRef = useRef(null);
  const searchAutoFocus = props.location.state?.searchAutoFocus ?? false;

  useEffect(() => {
    if (searchAutoFocus) {
      inputRef.current.focus();
    }
  }, [searchAutoFocus]);

  return (
    <>
      <Seo />
      <AppBar inputRef={inputRef} searchEnabled />
      {municipalities.length === 0 ? (
        <LandingScreen inputRef={inputRef} />
      ) : (
        <>
          <Container component="main">
            <Alert remote />
            <DragAndDropCards municipalities={municipalities} />
            <HomePageInfoText />
          </Container>
        </>
      )}
      <Footer />
    </>
  );
}
