import React from 'react';
import { Modal } from '@mui/material';

import { TrackerEntryForm } from './TrackerEntryForm';
import { TrackerEntryFormProps } from './types';

type TrackerEntryModalFormProps = TrackerEntryFormProps & {
  open: boolean;
};

export const TrackerEntryModalForm = ({
  open,
  onClose,
  ...rest
}: TrackerEntryModalFormProps) => {
  return (
    <Modal
      open={open}
      closeAfterTransition
      onClose={onClose}
      sx={{ mx: { xs: 2, md: 0 } }}
    >
      <>{open && <TrackerEntryForm onClose={onClose} {...rest} />}</>
    </Modal>
  );
};
