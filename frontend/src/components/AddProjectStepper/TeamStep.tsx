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

import { SelectField } from 'legos';

const FIELD_TEAM_ENTRY = {
  manager: 'manager',
  hourlyRate: 'hourlyRate',
  employee: 'employee',
  rate: 'rate',
} as const;

interface TeamStepEntryValues {
  [FIELD_TEAM_ENTRY.manager]: string;
  [FIELD_TEAM_ENTRY.hourlyRate]: string;
  [FIELD_TEAM_ENTRY.employee]: string;
  [FIELD_TEAM_ENTRY.rate]: string;
}

export const TeamStep = () => {
  const initialValues: TeamStepEntryValues = {
    [FIELD_TEAM_ENTRY.manager]: '',
    [FIELD_TEAM_ENTRY.hourlyRate]: '',
    [FIELD_TEAM_ENTRY.employee]: '',
    [FIELD_TEAM_ENTRY.rate]: '',
  };
  const formik = useFormik<TeamStepEntryValues>({
    initialValues,
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
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">Team</Typography>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack mt={3} mb={1} gap={3}>
            <Stack>
              <SelectField
                id={FIELD_TEAM_ENTRY.manager}
                name={FIELD_TEAM_ENTRY.manager}
                label="Project manager"
                items={itemSelectManager}
              />
            </Stack>

            <TextField
              id={FIELD_TEAM_ENTRY.hourlyRate}
              name={FIELD_TEAM_ENTRY.hourlyRate}
              label="Hourly rate agreements"
              fullWidth
              multiline
              onChange={handleChange}
            />
            <Stack direction="row" gap={2}>
              <Grid item xs={8}>
                <SelectField
                  id={FIELD_TEAM_ENTRY.employee}
                  name={FIELD_TEAM_ENTRY.employee}
                  label="Employee"
                  items={itemSelectEmployee}
                />
              </Grid>
              <Grid item xs={4}>
                <Stack direction="row">
                  <TextField
                    id={FIELD_TEAM_ENTRY.rate}
                    name={FIELD_TEAM_ENTRY.rate}
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
        </Stack>
      </form>
    </FormikContext.Provider>
  );
};
