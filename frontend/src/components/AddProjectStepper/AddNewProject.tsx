import React from 'react';
import {
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

const steps = ['New project', 'Team', 'Summary'];

export const AddNewProject = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <NewProjectStep handleNext={handleNext} />;
      case 1:
        return <TeamStep handleNext={handleNext} handleBack={handleBack} />;
      case 2:
        return <SummaryStep handleNext={handleNext} handleBack={handleBack} />;
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
          <>{getStepContent(activeStep)}</>
        )}
      </Stack>
    </Container>
  );
};
