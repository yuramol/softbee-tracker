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

import { CalendarPicker } from 'legos/CalendarPicker';

const modalStyle = {
  marginLeft: 'auto',
  marginRight: 'auto',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

interface TimeEntryValues {
  name: string;
  client: string;
  startDate: Date;
  endDate: Date;
}

export const ProjectLayout = () => {
  const formik = useFormik<TimeEntryValues>({
    initialValues: {
      name: '',
      client: '',
      startDate: new Date(),
      endDate: new Date(),
    },
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
              id="name"
              name="name"
              label="Name"
              size="small"
              multiline
              onChange={handleChange}
            />
            <TextField
              id="client"
              name="client"
              label="Client"
              size="small"
              multiline
              onChange={handleChange}
            />

            <Stack direction="row" justifyContent="space-between">
              <Stack>
                <InputLabel>
                  Start Date<span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <CalendarPicker />
              </Stack>
              <Stack>
                <InputLabel>
                  End Date<span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <CalendarPicker />
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
