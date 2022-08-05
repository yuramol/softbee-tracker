import React, { useContext, useState } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
import {
  Button,
  Typography,
  Modal,
  TextField,
  Tooltip,
  Stack,
} from '@mui/material';
import { useFormik, FormikContext } from 'formik';
import { format, startOfDay } from 'date-fns';

import { TimeContext } from 'components/TrackerDayView/TrackerDayView';
import { Select, Icon } from 'legos';
import { CalendarPickerFormik } from 'legos/CalendarPicker';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

const FIELD_TIME_ENTRY = {
  date: 'date',
  duration: 'duration',
  description: 'description',
  project: 'project',
} as const;

export interface TimeEntryValues {
  [FIELD_TIME_ENTRY.date]: Date;
  [FIELD_TIME_ENTRY.duration]: string;
  [FIELD_TIME_ENTRY.description]: string;
  [FIELD_TIME_ENTRY.project]: string;
}

export const TrackerAddNewEntry = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { onCreateTracker } = useContext(TimeContext);

  // TODO Add projects from backend
  const itemSelectProject = [
    { id: 1, label: 'LuxWash' },
    { id: 3, label: 'UpWork' },
    { id: 4, label: 'SoftBee' },
  ];

  const initialValues: TimeEntryValues = {
    [FIELD_TIME_ENTRY.date]: new Date(),
    [FIELD_TIME_ENTRY.duration]: format(startOfDay(new Date()), 'HH:mm'),
    [FIELD_TIME_ENTRY.description]: '',
    [FIELD_TIME_ENTRY.project]: '',
  };

  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const formik = useFormik<TimeEntryValues>({
    initialValues,
    onSubmit: (values) => {
      onCreateTracker(values);
      toggleOpenModal();
    },
  });

  const { handleChange, handleSubmit } = formik;

  return (
    <>
      <Tooltip title="Add New Entry">
        <Button variant="contained" onClick={toggleOpenModal}>
          <Icon icon="add" />
        </Button>
      </Tooltip>
      <Modal open={isOpenModal} closeAfterTransition onClose={toggleOpenModal}>
        <FormikContext.Provider value={formik}>
          <form onSubmit={handleSubmit}>
            <Stack sx={modalStyle}>
              <Stack>
                <Typography variant="h6">New time entry</Typography>
              </Stack>

              <Stack my={3} gap={3}>
                <Stack direction="row" gap={3}>
                  <CalendarPickerFormik field={FIELD_TIME_ENTRY.date} />
                  <TextField
                    name={FIELD_TIME_ENTRY.duration}
                    type="time"
                    variant="outlined"
                    fullWidth
                    value={formik.values.duration}
                    onChange={handleChange}
                  />
                </Stack>
                <Select
                  label="Project"
                  name={FIELD_TIME_ENTRY.project}
                  items={itemSelectProject}
                  onChange={handleChange}
                  variant="outlined"
                />
                <TextField
                  label="Description"
                  name={FIELD_TIME_ENTRY.description}
                  fullWidth
                  multiline
                  rows={4}
                  onChange={handleChange}
                />
              </Stack>

              <Stack direction="row" gap={2}>
                <Button variant="contained" type="submit">
                  Save Time
                </Button>
                <Button variant="outlined" onClick={toggleOpenModal}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </form>
        </FormikContext.Provider>
      </Modal>
    </>
  );
};
