import React from 'react';
import {
  Button,
  ButtonGroup,
  Typography,
  TextField,
  Stack,
} from '@mui/material';
import { FormikValues, useFormikContext } from 'formik';

import { CalendarPickerFormik } from 'legos';
import { CreateProjectFields, ProjectType } from './types';
import { Enum_Project_Type } from 'types/GraphqlTypes';

export const projectTypes: ProjectType[] = [
  {
    label: 'Time & Material',
    value: Enum_Project_Type.TimeMaterial,
  },
  {
    label: 'Fixed Price',
    value: Enum_Project_Type.FixedPrice,
  },
  {
    label: 'Non profit',
    value: Enum_Project_Type.NonProfit,
  },
];

export const NewProjectStep = () => {
  const { values, touched, errors, handleChange, setFieldValue } =
    useFormikContext<FormikValues>();

  return (
    <>
      <Typography variant="h5">New project</Typography>
      <Stack gap={4}>
        <ButtonGroup size="small" fullWidth>
          {projectTypes.map(({ label, value }) => (
            <Button
              key={value}
              size="large"
              variant={
                value === values[CreateProjectFields.Type]
                  ? 'contained'
                  : 'outlined'
              }
              onClick={() => {
                setFieldValue(CreateProjectFields.Type, value);
              }}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
        <TextField
          label="Project title"
          name={CreateProjectFields.Name}
          value={values[CreateProjectFields.Name]}
          multiline
          error={
            touched[CreateProjectFields.Name] &&
            !!errors[CreateProjectFields.Name]
          }
          helperText={
            touched[CreateProjectFields.Name] &&
            (errors[CreateProjectFields.Name] as string)
          }
          onChange={handleChange}
        />
        <TextField
          label="Client"
          name={CreateProjectFields.Client}
          value={values[CreateProjectFields.Client]}
          error={
            touched[CreateProjectFields.Client] &&
            !!errors[CreateProjectFields.Client]
          }
          helperText={
            touched[CreateProjectFields.Client] &&
            (errors[CreateProjectFields.Client] as string)
          }
          onChange={handleChange}
        />
        <Stack direction="row" spacing={2}>
          <CalendarPickerFormik
            label="Start Date"
            field={CreateProjectFields.Start}
          />
          <CalendarPickerFormik
            label="End Date"
            field={CreateProjectFields.End}
          />
        </Stack>
      </Stack>
    </>
  );
};
