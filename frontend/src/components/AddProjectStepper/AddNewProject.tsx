import React from 'react';
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

const steps = ['New project', 'Team', 'Summary'];

export const AddNewProject = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = (values: any) => {
    setActiveStep(activeStep + 1);
    console.log('===', values);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <NewProjectStep handleNext={handleNext} />;
      case 1:
        return <TeamStep handleNext={handleNext} />;
      case 2:
        return <SummaryStep handleNext={handleNext} />;
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
