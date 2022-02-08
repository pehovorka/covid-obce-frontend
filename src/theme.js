import { createTheme, adaptV4Theme } from "@mui/material";

export const theme = createTheme(
  adaptV4Theme({
    palette: {
      mode: "light",
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
      orpVaccinations: ["#0078B8", "#E67145", "#1FC44B", "#E6B617", "#2EA5E6"],
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          ".recharts-legend-item-text": {
            verticalAlign: "middle",
          },
        },
        body: {
          fontSize: "0.875rem",
          lineHeight: 1.43,
          letterSpacing: "0.01071em",
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  })
);

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
