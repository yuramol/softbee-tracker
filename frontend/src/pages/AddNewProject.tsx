import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';

import { Formik } from 'formik';
import { MainWrapper, NewProjectStep, SummaryStep, TeamStep } from 'components';

export const FIELD_NEW_PROJECT_ENTRY = {
  paymentMethod: 'paymentMethod',
  name: 'name',
  client: 'client',
  startDate: 'startDate',
  endDate: 'endDate',
  manager: 'manager',
  hourlyRate: 'hourlyRate',
  employee: 'employee',
  rate: 'rate',
} as const;

export interface AddNewProjectValues {
  [FIELD_NEW_PROJECT_ENTRY.paymentMethod]?: string;
  [FIELD_NEW_PROJECT_ENTRY.name]?: string;
  [FIELD_NEW_PROJECT_ENTRY.client]?: string;
  [FIELD_NEW_PROJECT_ENTRY.startDate]?: Date;
  [FIELD_NEW_PROJECT_ENTRY.endDate]?: Date;
  [FIELD_NEW_PROJECT_ENTRY.manager]?: string;
  [FIELD_NEW_PROJECT_ENTRY.hourlyRate]?: string;
  [FIELD_NEW_PROJECT_ENTRY.employee]?: string;
  [FIELD_NEW_PROJECT_ENTRY.rate]?: string;
}

const steps = ['New project', 'Team', 'Summary'];

const AddNewProject = () => {
  const initialValues: AddNewProjectValues = {
    [FIELD_NEW_PROJECT_ENTRY.paymentMethod]: 'Time & Material',
    [FIELD_NEW_PROJECT_ENTRY.name]: '',
    [FIELD_NEW_PROJECT_ENTRY.client]: '',
    [FIELD_NEW_PROJECT_ENTRY.startDate]: new Date(),
    [FIELD_NEW_PROJECT_ENTRY.endDate]: new Date(),
    [FIELD_NEW_PROJECT_ENTRY.hourlyRate]: '',
    [FIELD_NEW_PROJECT_ENTRY.manager]: '',
    [FIELD_NEW_PROJECT_ENTRY.employee]: '',
    [FIELD_NEW_PROJECT_ENTRY.rate]: '',
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
  return (
    <MainWrapper>
      <Stack mb={6}>
        <Typography variant="h1">Add new project</Typography>
      </Stack>

      <Stack gap={4}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Typography variant="h5" gutterBottom>
            Thank you for your order.
          </Typography>
        ) : (
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              console.log('values===', values);
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Stack justifyContent="space-between">
                  {getStepContent(activeStep)}
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
                      type={
                        activeStep === steps.length - 1 ? 'submit' : 'button'
                      }
                      onClick={handleNext}
                      sx={{ mt: 1, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? 'Create' : 'Next'}
                    </Button>
                  </Stack>
                </Stack>
              </form>
            )}
          </Formik>
        )}
      </Stack>
    </MainWrapper>
  );
};

export default AddNewProject;
