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
