import React, { useState } from 'react';
import {
  Button,
  Typography,
  TextField,
  IconButton,
  InputLabel,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik, FormikContext } from 'formik';

import { CalendarPickerFormik } from 'legos';

const modalStyle = {
  marginLeft: 'auto',
  marginRight: 'auto',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

const FIELD_NEW_PROJECT_ENTRY = {
  name: 'NAME',
  client: 'CLIENT',
  startDate: 'STARTDATE',
  endDate: 'ENDDATE',
} as const;

interface NewProjectEntryValues {
  [FIELD_NEW_PROJECT_ENTRY.name]: string;
  [FIELD_NEW_PROJECT_ENTRY.client]: string;
  [FIELD_NEW_PROJECT_ENTRY.startDate]: Date;
  [FIELD_NEW_PROJECT_ENTRY.endDate]: Date;
}

export const ProjectLayout = () => {
  const initialValues: NewProjectEntryValues = {
    [FIELD_NEW_PROJECT_ENTRY.name]: '',
    [FIELD_NEW_PROJECT_ENTRY.client]: '',
    [FIELD_NEW_PROJECT_ENTRY.startDate]: new Date(),
    [FIELD_NEW_PROJECT_ENTRY.endDate]: new Date(),
  };
  const formik = useFormik<NewProjectEntryValues>({
    initialValues,
    onSubmit: (values) => {
      console.log('===', values);
    },
  });

  const { handleChange, handleSubmit } = formik;

  return (
    <FormikContext.Provider value={formik}>
      <form onSubmit={handleSubmit}>
        <Stack sx={modalStyle}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">New project</Typography>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack my={3} gap={3}>
            <TextField
              id={FIELD_NEW_PROJECT_ENTRY.name}
              name={FIELD_NEW_PROJECT_ENTRY.name}
              label="Name"
              multiline
              onChange={handleChange}
            />
            <TextField
              id={FIELD_NEW_PROJECT_ENTRY.client}
              name={FIELD_NEW_PROJECT_ENTRY.client}
              label="Client"
              multiline
              onChange={handleChange}
            />

            <Stack direction="row" justifyContent="space-between">
              <Stack>
                <InputLabel>
                  Start Date<span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <CalendarPickerFormik
                  field={FIELD_NEW_PROJECT_ENTRY.startDate}
                />
              </Stack>
              <Stack>
                <InputLabel>
                  End Date<span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <CalendarPickerFormik field={FIELD_NEW_PROJECT_ENTRY.endDate} />
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="flex-end" gap={2}>
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained" type="submit">
              Next
            </Button>
          </Stack>
        </Stack>
      </form>
    </FormikContext.Provider>
  );
};
