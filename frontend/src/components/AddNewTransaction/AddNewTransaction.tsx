import React, { useState } from 'react';
import { Button, Tooltip } from '@mui/material';

import { useAuthUser } from 'hooks';
import { Icon } from 'legos';
import { TransactionEntryModalForm } from 'components/TransactionEntryModalForm';

type Props = {
  currentDay?: Date;
};

export const AddNewTransaction = ({ currentDay = new Date() }: Props) => {
  const { user } = useAuthUser();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const initialValuesForm = {
    date: currentDay,
    duration: 0,
  };

  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handelSubmit = () => {
    toggleOpenModal();
  };

  return (
    <>
      <TransactionEntryModalForm
        open={isOpenModal}
        onClose={toggleOpenModal}
        onSubmit={() => handelSubmit()}
        titleForm="New transaction"
        userId={user.id}
        initialValuesForm={initialValuesForm}
      />
      <Tooltip title="Add New Transaction">
        <Button variant="contained" onClick={toggleOpenModal}>
          <Icon icon="add" />
        </Button>
      </Tooltip>
    </>
  );
};
