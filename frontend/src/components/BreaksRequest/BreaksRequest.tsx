import React, { useState } from 'react';
import { Modal, Stack } from '@mui/material';
import { BreaksRequestForm } from './BreaksRequestForm';
import { Button } from 'legos';

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
        title="Request leave"
        fullWidth
      />

      <Modal
        closeAfterTransition
        open={isOpenModal}
        onClose={toggleOpenModal}
        sx={{ mx: { xs: 2, md: 0 } }}
      >
        <>{isOpenModal && <BreaksRequestForm onClose={toggleOpenModal} />}</>
      </Modal>
    </Stack>
  );
};
