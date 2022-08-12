import React from 'react';
import { Typography, TextField, Grid, Stack, Button } from '@mui/material';
import { FieldArray, FormikValues, useFormikContext } from 'formik';

import { SelectField } from 'legos';
import { FIELD_NEW_PROJECT_ENTRY } from './AddNewProject';

export const TeamStep = () => {
  const { values, handleChange } = useFormikContext<FormikValues>();

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
        <SelectField
          id={FIELD_NEW_PROJECT_ENTRY.manager}
          name={FIELD_NEW_PROJECT_ENTRY.manager}
          label="Project manager"
          items={itemSelectManager}
        />
        <TextField
          id={FIELD_NEW_PROJECT_ENTRY.hourlyRate}
          name={FIELD_NEW_PROJECT_ENTRY.hourlyRate}
          label="Hourly rate agreements"
          fullWidth
          multiline
          onChange={handleChange}
        />
        <FieldArray
          name={FIELD_NEW_PROJECT_ENTRY.employees}
          render={(arrayHelpers: any) => (
            <>
              {values.employees.length > 0 &&
                values.employees.map((employee: any, index: number) => (
                  <Grid
                    key={`${employee.firstName} ${employee.lastName}`}
                    container
                    columnSpacing={2}
                  >
                    <Grid item xs={6}>
                      <SelectField
                        id={employee.id ?? 1}
                        name={`${employee.firstName} ${employee.lastName}`}
                        label="Employee"
                        items={itemSelectEmployee}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        name={employee.rate}
                        label="Rate"
                        fullWidth
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        size="large"
                        variant="outlined"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        -
                      </Button>
                    </Grid>
                  </Grid>
                ))}
              <Button
                variant="contained"
                onClick={() =>
                  arrayHelpers.push({
                    id: null,
                    firstName: '',
                    lastName: '',
                    rate: null,
                  })
                }
                sx={{ width: 200 }}
              >
                + Add Employee
              </Button>
            </>
          )}
        />
      </Stack>
    </Stack>
  );
};
