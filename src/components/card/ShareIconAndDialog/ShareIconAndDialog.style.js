import { withStyles } from "@material-ui/core/styles";

import { Box, Grid, IconButton, Typography } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: 0,
    minWidth: 400,
  },
  closeButton: {
    color: theme.palette.grey[500],
  },
});

export const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Box px={2} py={1}>
        <Grid container alignItems="center" spacing={2} justify="space-between">
          <Grid item>
            <Typography variant="h6">{children}</Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </MuiDialogTitle>
  );
});
