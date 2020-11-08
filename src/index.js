import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./utils/apollo";
import { CssBaseline, ThemeProvider } from "@material-ui/core/";
import reportWebVitals from "./reportWebVitals";
import { createMuiTheme } from "@material-ui/core/styles";

import "./index.css";
import App from "./App";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      light: "#757ce8",
      main: "#0078B8",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#b84100",
      dark: "#ba000d",
      contrastText: "#fff",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <App />
          </CssBaseline>
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
