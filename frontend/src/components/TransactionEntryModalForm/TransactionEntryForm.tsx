import React from 'react';
import { Button, Typography, TextField, Stack } from '@mui/material';
import { useFormik, FormikContext } from 'formik';
import { startOfMonth, subMonths } from 'date-fns';
import * as yup from 'yup';

import { Select, CalendarPickerFormik } from 'legos';
import { TimePicker } from 'components';
import { useNormalizedUsers, useProjects } from 'hooks';
import { useFormikPropsErrors } from 'helpers';
import { TransactionEntryValues, TransactionEntryFormProps } from './types';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

export const TRANSACTION_ENTRY_FIELDS = {
  DATE: 'date',
  DESCRIPTION: 'description',
  DURATION: 'duration',
  PROJECT: 'project',
  STATUS: 'status',
  USER: 'user',
} as const;

export const TransactionEntryForm = ({
  titleForm,
  withEmployee = false,
  isLive = false,
  userId,
  projectId,
  onSubmit,
  onClose,
  initialValuesForm,
  buttonCloseTitle = 'Cancel',
  buttonSubmitTitle = 'Save Time',
}: TransactionEntryFormProps) => {
  const { projectsChoices } = useProjects({
    users: { id: { eq: userId } },
  });

  const { usersChoices } = useNormalizedUsers({
    projects: { id: { eq: projectId } },
  });
  const validationSchema = yup.object({
    ...(!isLive
      ? {
          [TRANSACTION_ENTRY_FIELDS.DATE]: yup
            .date()
            .required('Should not be empty'),
          [TRANSACTION_ENTRY_FIELDS.DURATION]: yup
            .string()
            .test(
              'duration',
              'Duration should be bigger than zero',
              (val) => val !== '0'
            )
            .required('Should not be empty'),
        }
      : {}),
    [TRANSACTION_ENTRY_FIELDS.PROJECT]: yup
      .string()
      .required('Should not be empty'),
    [TRANSACTION_ENTRY_FIELDS.USER]: yup
      .string()
      .required('Should not be empty'),
    [TRANSACTION_ENTRY_FIELDS.DESCRIPTION]: yup
      .string()
      .min(5, 'Description must be at least 5 characters')
      .required('Should not be empty'),
  });

  const initialValues: TransactionEntryValues = {
    [TRANSACTION_ENTRY_FIELDS.USER]: initialValuesForm?.user ?? userId,
    [TRANSACTION_ENTRY_FIELDS.DATE]: initialValuesForm?.date ?? new Date(),
    [TRANSACTION_ENTRY_FIELDS.DURATION]: initialValuesForm?.duration ?? 0,
    [TRANSACTION_ENTRY_FIELDS.DESCRIPTION]:
      initialValuesForm?.description ?? '',
    [TRANSACTION_ENTRY_FIELDS.PROJECT]: initialValuesForm?.project ?? '',
  };

  const formik = useFormik<TransactionEntryValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => onSubmit(values),
  });

  const { getPropsErrors } = useFormikPropsErrors(formik);

  const { setFieldValue, handleChange, handleSubmit, values } = formik;

  return (
    <FormikContext.Provider value={formik}>
      <form onSubmit={handleSubmit}>
        <Stack sx={modalStyle}>
          <Stack>
            <Typography variant="h6">{titleForm}</Typography>
          </Stack>
          <Stack my={3} gap={3}>
            {!isLive && (
              <Stack direction="row" gap={3}>
                <CalendarPickerFormik
                  field={TRANSACTION_ENTRY_FIELDS.DATE}
                  minDate={startOfMonth(subMonths(new Date(), 1))}
                  disableFuture
                  views={['day']}
                />
                <TimePicker
                  value={values[TRANSACTION_ENTRY_FIELDS.DURATION]}
                  onChange={(value) => {
                    setFieldValue(
                      `${TRANSACTION_ENTRY_FIELDS.DURATION}`,
                      value
                    );
                  }}
                  name={TRANSACTION_ENTRY_FIELDS.DURATION}
                  {...getPropsErrors(TRANSACTION_ENTRY_FIELDS.DURATION)}
                />
              </Stack>
            )}

            {withEmployee && (
              <Select
                label="Employee"
                items={usersChoices}
                value={values[TRANSACTION_ENTRY_FIELDS.USER]}
                name={TRANSACTION_ENTRY_FIELDS.USER}
                {...getPropsErrors(TRANSACTION_ENTRY_FIELDS.PROJECT)}
                variant="outlined"
                onChange={handleChange}
              />
            )}
            {!withEmployee && (
              <Select
                label="Project"
                items={projectsChoices}
                value={
                  projectsChoices.length > 0
                    ? values[TRANSACTION_ENTRY_FIELDS.PROJECT]
                    : ''
                }
                name={TRANSACTION_ENTRY_FIELDS.PROJECT}
                {...getPropsErrors(TRANSACTION_ENTRY_FIELDS.PROJECT)}
                variant="outlined"
                onChange={handleChange}
              />
            )}
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={values[TRANSACTION_ENTRY_FIELDS.DESCRIPTION]}
              name={TRANSACTION_ENTRY_FIELDS.DESCRIPTION}
              {...getPropsErrors(TRANSACTION_ENTRY_FIELDS.DESCRIPTION)}
              onChange={handleChange}
            />
          </Stack>

          <Stack direction="row" gap={2}>
            <Button variant="contained" type="submit">
              {buttonSubmitTitle}
            </Button>
            <Button variant="outlined" onClick={onClose}>
              {buttonCloseTitle}
            </Button>
          </Stack>
        </Stack>
      </form>
    </FormikContext.Provider>
  );
};
