import React, { useState } from 'react';
import {
  Button,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';

import { FormikContext, useFormik } from 'formik';
import { NewProjectStep, SummaryStep, TeamStep } from 'components';

export const FIELD_NEW_PROJECT_ENTRY = {
  paymentMethod: 'paymentMethod',
  projectTitle: 'projectTitle',
  client: 'client',
  startDate: 'startDate',
  endDate: 'endDate',
  manager: 'manager',
  employees: 'employees',
} as const;

interface EmployeeValues {
  id: string;
  name: string;
  rate: string;
}
export interface AddNewProjectValues {
  [FIELD_NEW_PROJECT_ENTRY.paymentMethod]?: string;
  [FIELD_NEW_PROJECT_ENTRY.projectTitle]?: string;
  [FIELD_NEW_PROJECT_ENTRY.client]?: string;
  [FIELD_NEW_PROJECT_ENTRY.startDate]?: Date;
  [FIELD_NEW_PROJECT_ENTRY.endDate]?: Date;
  [FIELD_NEW_PROJECT_ENTRY.manager]?: string;
  [FIELD_NEW_PROJECT_ENTRY.employees]?: EmployeeValues[];
}

const steps = ['New project', 'Team', 'Summary'];

export const AddNewProject = () => {
  const initialValues: AddNewProjectValues = {
    [FIELD_NEW_PROJECT_ENTRY.paymentMethod]: 'Time & Material',
    [FIELD_NEW_PROJECT_ENTRY.projectTitle]: '',
    [FIELD_NEW_PROJECT_ENTRY.client]: '',
    [FIELD_NEW_PROJECT_ENTRY.startDate]: new Date(),
    [FIELD_NEW_PROJECT_ENTRY.endDate]: new Date(
      new Date().getFullYear() + 1,
      new Date().getMonth(),
      new Date().getDate()
    ),
    [FIELD_NEW_PROJECT_ENTRY.manager]: '',
    [FIELD_NEW_PROJECT_ENTRY.employees]: [
      {
        id: '',
        rate: '',
        name: '',
      },
    ],
  };
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <NewProjectStep />;
      case 1:
        return <TeamStep />;
      case 2:
        return <SummaryStep />;
      default:
        throw new Error('Unknown step');
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log('===', values);
    },
  });

  return (
    <FormikContext.Provider value={formik}>
      <form onSubmit={formik.handleSubmit} style={{ height: '100%' }}>
        <Stack height="100%" justifyContent="space-between">
          <Stack gap={4}>
            <Typography variant="h4">Add new project</Typography>
            <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {getStepContent(activeStep)}
          </Stack>
          <Stack direction="row" justifyContent="flex-end">
            {activeStep !== 0 && (
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{ mt: 1, ml: 1 }}
              >
                Back
              </Button>
            )}
            {activeStep === 0 && (
              <Button variant="outlined" sx={{ mt: 1, ml: 1 }}>
                Cancel
              </Button>
            )}

            <Button
              variant="contained"
              type={activeStep === steps.length - 1 ? 'submit' : 'button'}
              onClick={handleNext}
              sx={{ mt: 1, ml: 1 }}
            >
              {activeStep === steps.length - 1 ? 'Create' : 'Next'}
            </Button>
          </Stack>
        </Stack>
      </form>
    </FormikContext.Provider>
  );
};
