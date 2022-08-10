import React, { forwardRef, useState } from 'react';
import { Typography, TextField, Grid, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Formik, FormikProps } from 'formik';

import { SelectField } from 'legos';
import { AddNewProjectValues, FIELD_NEW_PROJECT_ENTRY } from './AddNewProject';

export const TeamStep = forwardRef<FormikProps<AddNewProjectValues>>(
  (_, ref) => {
    const initialValues: AddNewProjectValues = {
      [FIELD_NEW_PROJECT_ENTRY.hourlyRate]: '',
      [FIELD_NEW_PROJECT_ENTRY.manager]: '',
      [FIELD_NEW_PROJECT_ENTRY.employee]: '',
      [FIELD_NEW_PROJECT_ENTRY.rate]: '',
    };

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
      <Formik
        innerRef={ref}
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log('values===', values);
        }}
      >
        {({ handleChange }) => (
          <form>
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
                    <Stack direction="row">
                      <TextField
                        id={FIELD_NEW_PROJECT_ENTRY.rate}
                        name={FIELD_NEW_PROJECT_ENTRY.rate}
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
        )}
      </Formik>
    );
  }
);

TeamStep.displayName = 'TeamStep';
