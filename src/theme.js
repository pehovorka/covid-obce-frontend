import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
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
    municipalityCasesChart: {
      activeCases: "#0078B8",
      newCasesOver65: "#EBC800",
      newCasesUnder65: "#B84100",
      newCasesAverage: "#F27F41",
    },
    orpVaccinations: ["#0078B8", "#E67145", "#22D083", "#E6B617", "#2EA5E6"],
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
