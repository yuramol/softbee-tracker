import React, { useContext, useState } from 'react';
import { Button, Tooltip } from '@mui/material';

import { useAuthUser } from 'hooks';
import { TimeContext } from 'components/TrackerDayView/TrackerDayView';
import { Icon } from 'legos';
import {
  TimeEntryValues,
  TrackerEntryModalForm,
} from 'components/TrackerEntryModalForm';

export const TrackerAddNewEntry = () => {
  const { user } = useAuthUser();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { onCreateTracker } = useContext(TimeContext);

  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handelSubmit = (values: TimeEntryValues) => {
    onCreateTracker({
      date: values.DATE,
      description: values.DESCRIPTION,
      project: values.PROJECT,
      user: user.id,
      duration: values.DURATION,
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
      />
      <Tooltip title="Add New Entry">
        <Button variant="contained" onClick={toggleOpenModal}>
          <Icon icon="add" />
        </Button>
      </Tooltip>
    </>
  );
};
