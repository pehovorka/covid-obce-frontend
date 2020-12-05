import React from "react";
import { Container, Box, Typography, Paper } from "@material-ui/core";
import { Footer } from "../components/Footer";
import { PrimarySearchAppBar } from "../components/AppBar";

export function PageNotFound({ message }) {
  document.title = `Obec nenalezena – COVID v obcích`;
  return (
    <>
      <PrimarySearchAppBar />
      <Container>
        <Paper>
          <Box textAlign="center" p={10}>
            <Typography variant="h2" component="h2">
              Obec nenalezena
            </Typography>
            <Typography variant="h5" component="p">
              {message}
            </Typography>
          </Box>
        </Paper>
        <Box mt={10}>
          <Footer />
        </Box>
      </Container>
    </>
  );
}
