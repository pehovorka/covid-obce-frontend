import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  button: {
    "&.active": {
      background: "rgba(0, 0, 0, 0.2)",
    },
    height: "2.25rem",
  },
  centerIcon: {
    "& .MuiButton-startIcon": { marginLeft: 0, marginRight: 0 },
  },
  centerIconOnMobile: {
    [theme.breakpoints.down("sm")]: {
      "& .MuiButton-startIcon": { marginLeft: 0, marginRight: 0 },
    },
  },
  hideOnMobile: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
