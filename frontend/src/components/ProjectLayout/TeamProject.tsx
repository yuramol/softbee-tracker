import React, { useState } from 'react';
import {
  Button,
  Typography,
  TextField,
  Grid,
  IconButton,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useFormik, FormikContext } from 'formik';

import { ModalSelect } from 'legos';

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
  manager: string;
  hourlyRate: string;
  employee: string;
  rate: string;
}

export const TeamProject = () => {
  const formik = useFormik<TimeEntryValues>({
    initialValues: {
      manager: '',
      hourlyRate: '',
      employee: '',
      rate: '',
    },
    onSubmit: (values) => {
      console.log('===', values);
    },
  });

  const { handleChange, handleSubmit } = formik;

  // TODO Add manager from backend
  const itemSelectManager = [{ label: 'Andriy' }, { label: 'Stas' }];

  // TODO Add employee from backend
  const itemSelectEmployee = [
    { label: 'Serhii' },
    { label: 'Stas' },
    { label: 'Oleg' },
    { label: 'Michael' },
  ];

  return (
    <FormikContext.Provider value={formik}>
      <form onSubmit={handleSubmit}>
        <Stack sx={modalStyle}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">Team</Typography>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack my={3} gap={3}>
            <Stack>
              <ModalSelect
                id="manager"
                name="manager"
                label="Project manager"
                size="small"
                items={itemSelectManager}
              />
            </Stack>

            <TextField
              id="hourlyRate"
              name="hourlyRate"
              label="Hourly rate agreements"
              size="small"
              fullWidth
              multiline
              onChange={handleChange}
            />
            <Stack direction="row" gap={2}>
              <Grid item xs={8}>
                <ModalSelect
                  id="employee"
                  name="employee"
                  label="Employee"
                  size="small"
                  items={itemSelectEmployee}
                />
              </Grid>
              <Grid item xs={4}>
                <Stack direction="row">
                  <TextField
                    id="rate"
                    name="rate"
                    size="small"
                    label="Rate"
                    fullWidth
                    onChange={handleChange}
                  />
                  <IconButton>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </Stack>
              </Grid>
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="flex-end" gap={2}>
            <Button variant="outlined">Back</Button>
            <Button variant="contained" type="submit">
              Next
            </Button>
          </Stack>
        </Stack>
      </form>
    </FormikContext.Provider>
  );
};
