import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    background:
      "linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);",
    minHeight: "calc(100vh - 72px)",
    boxShadow: "inset 0 7px 9px -7px rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(15),
    },
  },
  textContainer: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(7),
    },
  },
  title: {
    color: theme.palette.primary.dark,
    fontWeight: "900",
    fontSize: "1.75rem",
    marginBottom: "2rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "2.5rem",
      marginBottom: "4rem",
    },
  },
  subtitle: {
    fontSize: "1rem",
    fontWeight: "400",
    marginBottom: "2rem",
    width: "100%",
    textAlign: "justify",
    hyphens: "auto",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2rem",
      marginBottom: "4rem",
      width: "75%",
    },
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 12,
    height: "2.5rem",
    minWidth: "50%",
    [theme.breakpoints.up("sm")]: {
      height: 50,
      minWidth: "40%",
    },
  },
  noWrap: {
    whiteSpace: "nowrap",
  },
  image: {
    filter: "drop-shadow( 0px 40px 50px rgba(0, 0, 0, .25))",
    maxWidth: "100%",
    height: "auto",
  },
}));
