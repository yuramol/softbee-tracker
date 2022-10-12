import React from 'react';
import { Modal } from '@mui/material';

import { TransactionEntryForm } from './TransactionEntryForm';
import { TransactionEntryFormProps } from './types';

type TransactionEntryModalFormProps = TransactionEntryFormProps & {
  open: boolean;
};

export const TransactionEntryModalForm = ({
  open,
  onClose,
  ...rest
}: TransactionEntryModalFormProps) => {
  return (
    <Modal open={open} closeAfterTransition onClose={onClose}>
      <>{open && <TransactionEntryForm onClose={onClose} {...rest} />}</>
    </Modal>
  );
};
