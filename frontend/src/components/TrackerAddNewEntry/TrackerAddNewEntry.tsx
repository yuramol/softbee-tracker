import React, { useContext, useState } from 'react';
import { Button, Tooltip } from '@mui/material';

import { useAuthUser } from 'hooks';
import { TimeContext } from 'components/TrackerDayView/TrackerDayView';
import { Icon } from 'legos';
import {
  TimeEntryValues,
  TrackerEntryModalForm,
} from 'components/TrackerEntryModalForm';

type Props = {
  currentDay: Date;
};

export const TrackerAddNewEntry = ({ currentDay }: Props) => {
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

  const handelSubmit = (values: TimeEntryValues) => {
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
      <TrackerEntryModalForm
        open={isOpenModal}
        onClose={toggleOpenModal}
        onSubmit={(values) => handelSubmit(values)}
        titleForm="New time entry"
        userId={user.id}
        initialValuesForm={initialValuesForm}
      />
      <Tooltip title="Add New Entry">
        <Button variant="contained" onClick={toggleOpenModal}>
          <Icon icon="add" />
        </Button>
      </Tooltip>
    </>
  );
};
