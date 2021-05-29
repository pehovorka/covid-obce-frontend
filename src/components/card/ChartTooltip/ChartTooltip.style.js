import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: 500,
  },
  bigger: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: 500,
    lineHeight: "1.4rem",
  },
  alignRight: {
    marginLeft: "auto",
  },
  marginLeft: {
    marginLeft: "0.8rem",
  },
  title: {
    textAlign: "center",
    fontSize: "1.1rem",
    fontWeight: 500,
  },
}));
