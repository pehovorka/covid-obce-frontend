import React from "react";
import { Container, Box, Typography, Paper } from "@mui/material";
import { AppBar, Footer, SearchButton } from "../components/layout";
import { Seo } from "../utils/Seo";

export default function NotFoundPage({ message }) {
  return (
    <>
      <Seo title="Obec nenalezena" />
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
