import React, { useContext, useState } from 'react';
import { Button, Tooltip } from '@mui/material';

import { useAuthUser } from 'hooks';
import { TimeContext } from 'components/TrackerDayView/TrackerDayView';
import { Icon } from 'legos';
import { TransactionEntryValues } from 'components/TransactionEntryModalForm';
import { TransactionEntryModalForm } from 'components/TransactionEntryModalForm';

type Props = {
  currentDay?: Date;
};

export const AddNewTransaction = ({ currentDay = new Date() }: Props) => {
  const { user } = useAuthUser();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { onCreateTracker } = useContext(TimeContext);

  const initialValuesForm = {
    date: currentDay,
    duration: 0,
  };

  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handelSubmit = (values: TransactionEntryValues) => {
    onCreateTracker({
      date: values.date,
      description: values.description,
      project: values.project,
      user: user.id,
      durationMinutes: values.duration,
    });

    toggleOpenModal();
  };

  return (
    <>
      <TransactionEntryModalForm
        open={isOpenModal}
        onClose={toggleOpenModal}
        onSubmit={(values) => handelSubmit(values)}
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
