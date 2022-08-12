import React, { useRef, useState } from 'react';
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

import { FormikProps } from 'formik';
import { MainWrapper, NewProjectStep, SummaryStep, TeamStep } from 'components';

const steps = ['New project', 'Team', 'Summary'];

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

export type NewProjectData = {
  name: string;
  client: string;
  paymentMethod: string;
  startDate: Date;
  endDate: Date;
  manager: string;
  hourlyRate: string;
  employee: string;
  rate: string;
};

const addNewProjectData: NewProjectData = {
  name: '',
  client: '',
  paymentMethod: '',
  startDate: new Date(),
  endDate: new Date(),
  manager: '',
  hourlyRate: '',
  employee: '',
  rate: '',
};

const AddNewProject = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [newProjectData, setNewProjectData] = useState(addNewProjectData);

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
        return (
          <NewProjectStep
            ref={formikRef}
            setNewProjectData={setNewProjectData}
          />
        );
      case 1:
        return (
          <TeamStep
            ref={formikRef}
            setNewProjectData={setNewProjectData}
            newProjectData={newProjectData}
          />
        );
      case 2:
        return <SummaryStep newProjectData={newProjectData} />;
      default:
        throw new Error('Unknown step');
    }
  };
  return (
    <MainWrapper>
      <Container component="main">
        <Stack mb={6}>
          <Typography variant="h1">Add new project</Typography>
        </Stack>

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
    </MainWrapper>
  );
};

export default AddNewProject;
