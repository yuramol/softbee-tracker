import React from 'react';
import {
  Button,
  Typography,
  TextField,
  Stack,
  Modal,
  Box,
  Dialog,
  DialogContent,
} from '@mui/material';
import { useFormik, FormikContext } from 'formik';
import { startOfMonth, subMonths } from 'date-fns';
import * as yup from 'yup';

import { Select, CalendarPickerFormik } from 'legos';
import { TimePicker } from 'components';
import { useAuthUser, useNormalizedUsers, useProjects } from 'hooks';
import { formikPropsErrors } from 'helpers';
import { TimeEntryValues, TrackerEntryFormProps } from './types';
import { parseTime } from 'components/TimePicker/utils';

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

export const TIME_ENTRY_FIELDS = {
  DATE: 'date',
  DESCRIPTION: 'description',
  DURATION: 'durationMinutes',
  PROJECT: 'project',
  STATUS: 'status',
  USER: 'user',
} as const;

export const TrackerEntryForm = ({
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
}: TrackerEntryFormProps) => {
  const { user } = useAuthUser();

  const { projectsChoices } = useProjects({
    users: { id: { eq: user.id } },
  });

  const { usersChoices } = useNormalizedUsers({
    projects: { id: { eq: projectId } },
  });
  const validationSchema = yup.object({
    ...(!isLive
      ? {
          [TIME_ENTRY_FIELDS.DATE]: yup.date().required('Should not be empty'),
          [TIME_ENTRY_FIELDS.DURATION]: yup
            .string()
            .test('duration', 'Duration min 00:05', (val) => val !== '0')
            .required('Should not be empty'),
        }
      : {}),
    [TIME_ENTRY_FIELDS.PROJECT]: yup.string().required('Should not be empty'),
    [TIME_ENTRY_FIELDS.USER]: yup.string().required('Should not be empty'),
    [TIME_ENTRY_FIELDS.DESCRIPTION]: yup
      .string()
      .min(5, 'Description must be at least 5 characters')
      .required('Should not be empty'),
  });

  const initialValues: TimeEntryValues = {
    [TIME_ENTRY_FIELDS.USER]:
      initialValuesForm?.[TIME_ENTRY_FIELDS.USER] ?? userId,
    [TIME_ENTRY_FIELDS.DATE]:
      initialValuesForm?.[TIME_ENTRY_FIELDS.DATE] ?? new Date(),
    [TIME_ENTRY_FIELDS.DURATION]:
      initialValuesForm?.[TIME_ENTRY_FIELDS.DURATION] ?? 0,
    [TIME_ENTRY_FIELDS.DESCRIPTION]:
      initialValuesForm?.[TIME_ENTRY_FIELDS.DESCRIPTION] ?? '',
    [TIME_ENTRY_FIELDS.PROJECT]:
      initialValuesForm?.[TIME_ENTRY_FIELDS.PROJECT] ?? '',
  };

  const formik = useFormik<TimeEntryValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => onSubmit(values),
  });

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
                  field={TIME_ENTRY_FIELDS.DATE}
                  minDate={startOfMonth(subMonths(new Date(), 0))}
                  disableFuture
                  views={['day']}
                />

                <TimePicker
                  value={values[TIME_ENTRY_FIELDS.DURATION]}
                  onChange={(value) => {
                    setFieldValue(`${TIME_ENTRY_FIELDS.DURATION}`, value);
                  }}
                  name={TIME_ENTRY_FIELDS.DURATION}
                  {...formikPropsErrors(TIME_ENTRY_FIELDS.DURATION, formik)}
                />
              </Stack>
            )}

            {withEmployee && (
              <Select
                label="Employee"
                items={usersChoices}
                value={values[TIME_ENTRY_FIELDS.USER]}
                name={TIME_ENTRY_FIELDS.USER}
                {...formikPropsErrors(TIME_ENTRY_FIELDS.PROJECT, formik)}
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
                    ? values[TIME_ENTRY_FIELDS.PROJECT]
                    : ''
                }
                name={TIME_ENTRY_FIELDS.PROJECT}
                {...formikPropsErrors(TIME_ENTRY_FIELDS.PROJECT, formik)}
                variant="outlined"
                onChange={handleChange}
              />
            )}
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={values[TIME_ENTRY_FIELDS.DESCRIPTION]}
              name={TIME_ENTRY_FIELDS.DESCRIPTION}
              {...formikPropsErrors(TIME_ENTRY_FIELDS.DESCRIPTION, formik)}
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
