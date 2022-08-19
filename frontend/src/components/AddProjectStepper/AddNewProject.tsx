import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Button,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { FormikContext, useFormik } from 'formik';
import * as yup from 'yup';

import { Loader, NewProjectStep, SummaryStep, TeamStep } from 'components';
import { CREATE_PROJECT_MUTATION } from 'api';
import { addYears } from 'date-fns';
import { CreateProjectFields } from './types';

type Props = {
  setIsCreateProject: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FIELD_NEW_PROJECT_ENTRY = {
  paymentMethod: 'paymentMethod',
  projectTitle: 'name',
  client: 'client',
  startDate: 'startDate',
  endDate: 'endDate',
  manager: 'manager',
  employees: 'employees',
} as const;

const steps = [
  {
    name: 'New project',
    fields: [
      CreateProjectFields.Type,
      CreateProjectFields.Name,
      CreateProjectFields.Client,
      CreateProjectFields.Start,
      CreateProjectFields.End,
    ],
  },
  {
    name: 'Team',
    fields: [
      CreateProjectFields.Status,
      CreateProjectFields.Salary,
      CreateProjectFields.Managers,
    ],
  },
  {
    name: 'Summary',
    fields: [],
  },
];

export const AddNewProject: React.FC<Props> = ({ setIsCreateProject }) => {
  const initialValues = {
    [CreateProjectFields.Type]: 'time_material',
    [CreateProjectFields.Name]: '',
    [CreateProjectFields.Client]: '',
    [CreateProjectFields.Start]: new Date(),
    [CreateProjectFields.End]: addYears(new Date(), 1),
    [CreateProjectFields.Managers]: '',
    [CreateProjectFields.Salary]: [],
    [CreateProjectFields.Users]: [],
  };
  const [activeStep, setActiveStep] = useState(0);
  const [createProject] = useMutation(CREATE_PROJECT_MUTATION);

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
        return <Loader />;
    }
  };

  const validationSchema = yup.object({
    [CreateProjectFields.Name]: yup.string().required('Should not be empty'),
    [CreateProjectFields.Client]: yup.string().required('Should not be empty'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log('Submit:', values);

      // createProject({ variables: { data: values } })
      //   .then(() => {
      //     setIsCreateProject(false);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },
  });

  return (
    <FormikContext.Provider value={formik}>
      <Stack height="100%">
        <Typography variant="h1">Add new project</Typography>
        <Stack
          component="form"
          onSubmit={formik.handleSubmit}
          justifyContent="space-between"
          flexGrow="1"
          gap={4}
          mt={6}
        >
          <Stack gap={8}>
            <Stepper activeStep={activeStep}>
              {steps.map(({ name }) => (
                <Step key={name}>
                  <StepLabel>{name}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {getStepContent(activeStep)}
          </Stack>
          <Stack direction="row" justifyContent="flex-end">
            {
              //activeStep !== steps.length &&
              activeStep !== 0 ? (
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  sx={{ width: 150, mt: 1, ml: 1 }}
                >
                  Back
                </Button>
              ) : (
                <Button variant="outlined" sx={{ width: 150, mt: 1, ml: 1 }}>
                  Cancel
                </Button>
              )
            }

            <Button
              variant="contained"
              disabled={formik.isSubmitting}
              type={activeStep === steps.length ? 'submit' : 'button'}
              onClick={handleNext}
              sx={{ width: 150, mt: 1, ml: 1 }}
            >
              {activeStep >= steps.length - 1 ? 'Create' : 'Next'}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </FormikContext.Provider>
  );
};
