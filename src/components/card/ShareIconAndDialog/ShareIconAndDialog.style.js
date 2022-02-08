import withStyles from "@mui/styles/withStyles";

import { Box, Grid, IconButton, Typography } from "@mui/material";
import MuiDialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

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
        <Grid
          container
          alignItems="center"
          spacing={2}
          justifyContent="space-between"
        >
          <Grid item>
            <Typography variant="h6">{children}</Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={onClose}
              size="large"
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </MuiDialogTitle>
  );
});
