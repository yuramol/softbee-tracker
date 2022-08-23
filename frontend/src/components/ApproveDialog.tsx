import React from 'react';

import { Button } from 'legos';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  questionText?: string;
};

export const ApproveDialog: React.FC<Props> = ({
  open,
  questionText,
  onClose,
}) => (
  <>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle textAlign="center">{'You sure? '}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {questionText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button title="Yes" variant="contained" onClick={onClose} />
        <Button title="No" variant="contained" onClick={onClose} autoFocus />
      </DialogActions>
    </Dialog>
  </>
);
