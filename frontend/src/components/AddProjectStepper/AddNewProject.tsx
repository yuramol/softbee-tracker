import React, { useRef } from 'react';
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
import { NewProjectStep } from './NewProjectStep';
import { TeamStep } from './TeamStep';
import { SummaryStep } from './SummaryStep';
import { FormikProps } from 'formik';

const steps = ['New project', 'Team', 'Summary'];

export const FIELD_NEW_PROJECT_ENTRY = {
  payment_method: 'payment_method',
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
  [FIELD_NEW_PROJECT_ENTRY.payment_method]?: string;
  [FIELD_NEW_PROJECT_ENTRY.name]?: string;
  [FIELD_NEW_PROJECT_ENTRY.client]?: string;
  [FIELD_NEW_PROJECT_ENTRY.startDate]?: Date;
  [FIELD_NEW_PROJECT_ENTRY.endDate]?: Date;
  [FIELD_NEW_PROJECT_ENTRY.manager]?: string;
  [FIELD_NEW_PROJECT_ENTRY.hourlyRate]?: string;
  [FIELD_NEW_PROJECT_ENTRY.employee]?: string;
  [FIELD_NEW_PROJECT_ENTRY.rate]?: string;
}

export const AddNewProject = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const formikRef = useRef<FormikProps<AddNewProjectValues>>(null);

  const handleNext = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <NewProjectStep ref={formikRef} />;
      case 1:
        return <TeamStep />;
      case 2:
        return <SummaryStep />;
      default:
        throw new Error('Unknown step');
    }
  };
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Stack alignItems="stretch" gap={4}>
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
          <>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button
                  variant="outlined"
                  type="submit"
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
                type="submit"
                onClick={handleNext}
                sx={{ mt: 1, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? 'Create' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Stack>
    </Container>
  );
};
