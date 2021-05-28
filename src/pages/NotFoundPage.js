import React from "react";
import { Container, Box, Typography, Paper } from "@material-ui/core";
import { AppBar, Footer, SearchButton } from "../components/layout";

export function NotFoundPage({ message }) {
  document.title = `Obec nenalezena – COVID v obcích`;
  return (
    <>
      <AppBar />
      <Container>
        <Box my={4}>
          <Paper>
            <Box textAlign="center" p={10}>
              <Typography variant="h2" component="h2">
                Obec nenalezena
              </Typography>
              <Typography variant="h5" component="p">
                {message}
              </Typography>
              <Box mt={5}>
                <SearchButton />
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
