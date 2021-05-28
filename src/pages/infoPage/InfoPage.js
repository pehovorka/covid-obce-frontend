import React, { useState, useEffect } from "react";
import ReactMarkdown from "markdown-to-jsx";

import { Container, Box, Paper, Typography, Grid } from "@material-ui/core";

import { AppBar, Footer } from "../../components/layout";
import { BackToHomeLink } from "../../components";
import { options } from "./InfoPage.style";
import infoContent from "../../assets/infoContent.md";

export function InfoPage() {
  const [markdown, setMarkdown] = useState("");
  useEffect(() => {
    fetch(infoContent)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  document.title = `O webu – COVID v obcích`;

  return (
    <>
      <AppBar />
      <Container component="main">
        <Box py={4}>
          <Paper>
            <Box p={6}>
              <ReactMarkdown options={options}>{markdown}</ReactMarkdown>
              <Box mt={6}>
                <Grid container justify="space-between">
                  <Grid item>
                    <BackToHomeLink />
                  </Grid>
                  <Grid item>
                    <Typography variant="caption" color="textSecondary">
                      Verze {process.env.REACT_APP_VERSION}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
