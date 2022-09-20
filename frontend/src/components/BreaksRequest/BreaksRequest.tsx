import React, { useState } from 'react';
import { Button, Modal, Stack } from '@mui/material';
import { BreaksRequestForm } from './BreaksRequestForm';

export const BreaksRequest = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <Stack mb={1}>
      <Button
        onClick={toggleOpenModal}
        variant="contained"
        size="small"
        fullWidth
      >
        Request leave
      </Button>
      <Modal closeAfterTransition open={isOpenModal} onClose={toggleOpenModal}>
        <>{isOpenModal && <BreaksRequestForm onClose={toggleOpenModal} />}</>
      </Modal>
    </Stack>
  );
};
