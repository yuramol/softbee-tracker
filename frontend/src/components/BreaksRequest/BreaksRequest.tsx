import React, { useState } from 'react';
import { Button, Modal, Stack } from '@mui/material';
import { BreaksRequestForm } from './BreaksRequestForm';

export const BreaksRequest = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <Stack mb={2}>
      <Button
        onClick={toggleOpenModal}
        variant="outlined"
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
