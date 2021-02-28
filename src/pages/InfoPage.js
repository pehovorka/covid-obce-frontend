import React, { useState, useEffect } from "react";
import ReactMarkdown from "markdown-to-jsx";

import { withStyles } from "@material-ui/core/styles";
import {
  Container,
  Box,
  Paper,
  Typography,
  Link,
  Grid,
} from "@material-ui/core";

import { PrimarySearchAppBar } from "../components/AppBar";
import { Footer } from "../components/Footer";
import infoContent from "../assets/infoContent.md";
import { BackToHomeLink } from "../components/BackToHomeLink";

const styles = (theme) => ({
  listItem: {
    marginTop: theme.spacing(1),
  },
});

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: "h4",
        component: "h2",
      },
    },
    h2: {
      component: Typography,
      props: { gutterBottom: true, variant: "h5", component: "h3" },
    },
    h3: {
      component: Typography,
      props: { gutterBottom: false, variant: "subtitle1", component: "h4" },
    },
    h4: {
      component: Typography,
      props: { gutterBottom: true, variant: "caption", paragraph: true },
    },
    p: { component: Typography, props: { paragraph: true } },
    a: { component: Link },
    li: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <li className={classes.listItem}>
          <Typography component="span" {...props} />
        </li>
      )),
    },
  },
};

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
      <PrimarySearchAppBar />
      <Container>
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
        <Box>
          <Footer />
        </Box>
      </Container>
    </>
  );
}
