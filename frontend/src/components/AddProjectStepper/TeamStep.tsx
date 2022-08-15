import React from 'react';
import { Typography, TextField, Grid, Stack, Button } from '@mui/material';
import { FieldArray, FormikValues, useFormikContext } from 'formik';

import { Select } from 'legos';
import { FIELD_NEW_PROJECT_ENTRY } from './AddNewProject';

export const TeamStep = () => {
  const { values, handleChange, setFieldValue } =
    useFormikContext<FormikValues>();

  // TODO Add manager from backend
  const itemSelectManager = [
    { label: 'Andriy', value: '1' },
    { label: 'Stas', value: '2' },
  ];

  // TODO Add employee from backend
  const itemSelectEmployee = [
    { label: 'Serhii', value: '1' },
    { label: 'Stas', value: '2' },
    { label: 'Oleg', value: '3' },
    { label: 'Michael', value: '4' },
  ];

  console.log('====', values.employees);

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Team</Typography>
      </Stack>

      <Stack mt={3} mb={1} gap={3}>
        <Select
          name={FIELD_NEW_PROJECT_ENTRY.manager}
          label="Project manager"
          items={itemSelectManager}
          value={values.manager}
          variant="outlined"
          onChange={handleChange}
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
                  <Grid key={`${employee}`} container columnSpacing={2}>
                    <Grid item xs={6}>
                      <Select
                        label="Employee"
                        variant="outlined"
                        value={employee.id}
                        items={itemSelectEmployee}
                        onChange={(e) => {
                          setFieldValue(
                            `${FIELD_NEW_PROJECT_ENTRY.employees}.${index}.id`,
                            e.target.value
                          );
                          setFieldValue(
                            `${FIELD_NEW_PROJECT_ENTRY.employees}.${index}.name`,
                            itemSelectEmployee.find(
                              (item) => item.value === e.target.value
                            )?.label
                          );
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Rate"
                        fullWidth
                        onChange={(e) => {
                          setFieldValue(
                            `${FIELD_NEW_PROJECT_ENTRY.employees}.${index}.rate`,
                            e.target.value
                          );
                        }}
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
                onClick={() => arrayHelpers.push('----')}
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
