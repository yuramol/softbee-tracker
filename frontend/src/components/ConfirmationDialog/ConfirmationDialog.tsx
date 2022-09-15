import React from 'react';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
} from '@mui/material';

import { Button } from 'legos';

type ConfirmationDialogProps = {
  open: boolean;
  title: string | JSX.Element;
  text: string | JSX.Element;
  onConfirmation: () => void;
  onClose: () => void;
  buttonCloseTitle?: string;
  buttonConfirmationTitle?: string;
};

export const ConfirmationDialog = ({
  open,
  title,
  text,
  onConfirmation,
  onClose,
  buttonCloseTitle = 'Close',
  buttonConfirmationTitle = 'Ok',
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{text}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={onConfirmation}
          title={buttonConfirmationTitle}
        />
        <Button variant="outlined" onClick={onClose} title={buttonCloseTitle} />
      </DialogActions>
    </Dialog>
  );
};
