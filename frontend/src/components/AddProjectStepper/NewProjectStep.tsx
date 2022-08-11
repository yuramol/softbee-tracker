import React, { forwardRef, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Typography,
  TextField,
  InputLabel,
  Stack,
  Grid,
} from '@mui/material';
import { Formik, FormikProps } from 'formik';

import { CalendarPickerFormik } from 'legos';
import {
  AddNewProjectValues,
  FIELD_NEW_PROJECT_ENTRY,
} from '../../pages/AddNewProject';

type NewProjectStepProps = {
  setNewProjectData: any;
};

const paymentTypes = [
  {
    label: 'Time & Material',
    value: 'timeMaterial',
  },
  {
    label: 'Fixed Price',
    value: 'fixedPrice',
  },
  {
    label: 'Non profit',
    value: 'nonProfit',
  },
];

export const NewProjectStep = forwardRef<
  FormikProps<AddNewProjectValues>,
  NewProjectStepProps
>(({ setNewProjectData }, ref) => {
  const initialValues: AddNewProjectValues = {
    [FIELD_NEW_PROJECT_ENTRY.paymentMethod]: paymentTypes[0].label,
    [FIELD_NEW_PROJECT_ENTRY.name]: '',
    [FIELD_NEW_PROJECT_ENTRY.client]: '',
    [FIELD_NEW_PROJECT_ENTRY.startDate]: new Date(),
    [FIELD_NEW_PROJECT_ENTRY.endDate]: new Date(),
  };

  return (
    <Formik
      innerRef={ref}
      initialValues={initialValues}
      onSubmit={(values) => {
        setNewProjectData(values);
      }}
    >
      {({ values, handleChange, setFieldValue }) => (
        <form>
          <Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6">New project</Typography>
            </Stack>

            <Stack mt={3} mb={1} gap={3}>
              <ButtonGroup size="small" fullWidth>
                {paymentTypes.map(({ label, value }) => (
                  <Button
                    key={value}
                    size="large"
                    variant={
                      label === values.paymentMethod ? 'contained' : 'outlined'
                    }
                    onClick={() => {
                      setFieldValue('paymentMethod', label);
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </ButtonGroup>
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

              <Stack direction="row" justifyContent="space-between" gap={2}>
                <Grid item xs={6}>
                  <InputLabel>
                    Start Date<span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <CalendarPickerFormik
                    field={FIELD_NEW_PROJECT_ENTRY.startDate}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>
                    End Date<span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <CalendarPickerFormik
                    field={FIELD_NEW_PROJECT_ENTRY.endDate}
                  />
                </Grid>
              </Stack>
            </Stack>
          </Stack>
        </form>
      )}
    </Formik>
  );
});

NewProjectStep.displayName = 'NewProjectStep';
