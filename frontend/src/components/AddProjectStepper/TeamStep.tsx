import React from 'react';
import { Typography, TextField, Grid, Stack } from '@mui/material';
import { useFormikContext } from 'formik';

import { SelectField } from 'legos';
import { FIELD_NEW_PROJECT_ENTRY } from './AddNewProject';

export const TeamStep = () => {
  const { handleChange } = useFormikContext();

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
    <Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Team</Typography>
      </Stack>

      <Stack mt={3} mb={1} gap={3}>
        <Stack>
          <SelectField
            id={FIELD_NEW_PROJECT_ENTRY.manager}
            name={FIELD_NEW_PROJECT_ENTRY.manager}
            label="Project manager"
            items={itemSelectManager}
          />
        </Stack>

        <TextField
          id={FIELD_NEW_PROJECT_ENTRY.hourlyRate}
          name={FIELD_NEW_PROJECT_ENTRY.hourlyRate}
          label="Hourly rate agreements"
          fullWidth
          multiline
          onChange={handleChange}
        />
        <Stack direction="row" gap={2}>
          <Grid item xs={8}>
            <SelectField
              id={FIELD_NEW_PROJECT_ENTRY.employee}
              name={FIELD_NEW_PROJECT_ENTRY.employee}
              label="Employee"
              items={itemSelectEmployee}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id={FIELD_NEW_PROJECT_ENTRY.rate}
              name={FIELD_NEW_PROJECT_ENTRY.rate}
              label="Rate"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Stack>
      </Stack>
    </Stack>
  );
};
