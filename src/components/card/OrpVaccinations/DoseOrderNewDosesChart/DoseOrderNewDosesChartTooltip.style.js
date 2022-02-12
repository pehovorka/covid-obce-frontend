import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: 500,
  },
  bigger: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: 500,
    lineHeight: "1.4rem",
    marginTop: "0.2rem",
  },
  title: {
    textAlign: "center",
    fontSize: "1.1rem",
    fontWeight: 500,
  },
}));
