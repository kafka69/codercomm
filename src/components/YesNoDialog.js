import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

function YesNoDialog({ type,open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure you want to delete this {type}?</DialogTitle>
      <DialogContent>
        Once deleted {type} will not be recovered
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          No
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose(); 
          }}
          color="primary"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default YesNoDialog;
