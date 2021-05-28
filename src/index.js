import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./utils/apollo";
import { CssBaseline, ThemeProvider } from "@material-ui/core/";
import { createMuiTheme } from "@material-ui/core/styles";

import "./index.css";
import App from "./App";
import { MunicipalitiesProvider } from "./providers/MunicipalitiesProvider";
import { SnackBar } from "./components/SnackBar";
import { ErrorBoundary } from "./ErrorBoundary";
import { MessagesFetcher } from "./utils/MessagesFetcher";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      light: "#757ce8",
      main: "#0078B8",
      dark: "#00527D",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#FFBA00",
      dark: "#ffc833",
      contrastText: "#222222",
    },
  },
});

theme.typography.h5 = {
  fontSize: "1.2rem",
  fontWeight: 400,
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.4rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem",
  },
};

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <MunicipalitiesProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline>
                <App />
                <SnackBar />
                <MessagesFetcher />
              </CssBaseline>
            </ThemeProvider>
          </MunicipalitiesProvider>
        </ApolloProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
