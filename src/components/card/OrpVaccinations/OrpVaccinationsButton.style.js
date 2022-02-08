import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(270deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(360deg)",
  },
  spinner: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-12px",
    marginLeft: "-12px",
  },
  syringeIcon: {
    padding: 20,
  },
}));
