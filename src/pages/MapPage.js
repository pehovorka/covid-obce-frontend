import React from "react";
import { Container, Box, Typography, Paper } from "@material-ui/core";
import { AppBar, Footer } from "../components/layout";
import { Seo } from "../utils/Seo";
import Map from "../components/map/Map";

export default function MapPage() {
  return (
    <>
      <Seo title="Mapa obcí" />
      <AppBar />
      <Container>
        <Box my={4}>
          <Paper>
            <Typography variant="h3" component="h2">
              Mapa obcí
            </Typography>
            <Map />
          </Paper>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
