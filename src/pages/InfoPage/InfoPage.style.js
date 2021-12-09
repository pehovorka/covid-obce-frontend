import { withStyles } from "@material-ui/core/styles";
import { Divider, Typography, Link } from "@material-ui/core";

const styles = (theme) => ({
  listItem: {
    marginTop: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
});

export const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: "h4",
        component: "h2",
      },
    },
    h2: {
      component: Typography,
      props: { gutterBottom: true, variant: "h5", component: "h3" },
    },
    h3: {
      component: Typography,
      props: { gutterBottom: false, variant: "h6", component: "h4" },
    },
    h4: {
      component: Typography,
      props: { gutterBottom: true, variant: "caption", paragraph: true },
    },
    p: { component: Typography, props: { paragraph: true, variant: "body1" } },
    a: { component: Link },
    li: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <li className={classes.listItem}>
          <Typography component="span" {...props} />
        </li>
      )),
    },
    hr: {
      component: withStyles(styles)(({ classes }) => (
        <Divider className={classes.divider} light={true} variant="fullWidth" />
      )),
    },
  },
};
