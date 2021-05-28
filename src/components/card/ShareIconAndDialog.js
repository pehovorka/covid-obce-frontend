import React, { useState, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import ShareIcon from "@material-ui/icons/Share";
import FileCopyIcon from "@material-ui/icons/FileCopy";

export function ShareIconAndDialog({ code, name }) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState(
    "Zkopírovat do schránky"
  );
  const inputRef = useRef();

  const handleOpen = () => {
    if (navigator.share) {
      navigator
        .share({
          title: getTitle(),
          text: `${name} – vývoj počtu lidí s prokázaným onemocněním COVID-19`,
          url: getUrl(),
        })
        .then(() => {})
        .catch((error) => console.log("Chyba sdílení", error));
    } else {
      setCopyButtonText("Zkopírovat do schránky");
      setShareDialogOpen(true);
    }
    window.gtag("event", "share", {
      method: "Link",
      content_type: name,
      content_id: code,
    });
  };

  const handleClose = () => {
    setShareDialogOpen(false);
  };

  const handleCopy = () => {
    inputRef.current.childNodes[1].children[0].select();
    document.execCommand("copy");
    setCopyButtonText("Zkopírováno!");
  };

  const getUrl = () => {
    const baseUrl = window.location.origin.toString();
    const path = "/obec/";
    const municipalityCode = code;
    return baseUrl + path + municipalityCode;
  };

  const getTitle = () => {
    return `${name} – COVID v obcích`;
  };

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Box px={2} py={1}>
          <Grid
            container
            alignItems="center"
            spacing={2}
            justify="space-between"
          >
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

  return (
    <>
      <Tooltip title="Sdílet odkaz">
        <IconButton aria-label="share" onClick={() => handleOpen()}>
          <ShareIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={shareDialogOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" onClose={handleClose}>
          {name} – sdílení
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Přímý odkaz na detail vybrané obce"
            type="url"
            fullWidth
            value={getUrl()}
            inputProps={{
              readOnly: true,
            }}
            ref={inputRef}
          />
          <Box textAlign="center" mt={2}>
            <Button
              onClick={handleCopy}
              color="primary"
              startIcon={<FileCopyIcon />}
            >
              {copyButtonText}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

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
