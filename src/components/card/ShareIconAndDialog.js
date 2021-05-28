import React, { useState, useRef } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Tooltip,
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import { DialogTitle } from "./ShareIconAndDialog.style";

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
