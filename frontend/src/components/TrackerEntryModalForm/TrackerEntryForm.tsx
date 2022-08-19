import React, { useEffect } from 'react';
import { Button, Typography, TextField, Stack } from '@mui/material';
import { useFormik, FormikContext } from 'formik';
import { startOfMonth, subMonths } from 'date-fns';
import * as yup from 'yup';

import { Select, CalendarPickerFormik } from 'legos';
import TimePicker from 'components/TimePicker';
import { useProjectsByUserList } from 'hooks';
import { formikPropsErrors } from 'helpers';

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

const FIELD_TIME_ENTRY = {
  DATE: 'DATE',
  DURATION: 'DURATION',
  DESCRIPTION: 'DESCRIPTION',
  PROJECT: 'PROJECT',
} as const;

export type TimeEntryValues = {
  [FIELD_TIME_ENTRY.DATE]: Date;
  [FIELD_TIME_ENTRY.DURATION]: string;
  [FIELD_TIME_ENTRY.DESCRIPTION]: string;
  [FIELD_TIME_ENTRY.PROJECT]: string;
};

const validationSchema = yup.object({
  [FIELD_TIME_ENTRY.DATE]: yup.date().required('Should not be empty'),
  [FIELD_TIME_ENTRY.DURATION]: yup
    .string()
    .test('duration', 'Duration min 00:05', (val) => val !== '00:00')
    .required('Should not be empty'),
  [FIELD_TIME_ENTRY.PROJECT]: yup.string().required('Should not be empty'),
  [FIELD_TIME_ENTRY.DESCRIPTION]: yup
    .string()
    .min(5, 'Description must be at least 5 characters')
    .required('Should not be empty'),
});

export type TrackerEntryFormProps = {
  titleForm: string;
  userId: string;
  onSubmit: (values: TimeEntryValues) => void;
  onClose: () => void;
  initialValuesForm?: TimeEntryValues;
  buttonCloseTitle?: string;
  buttonSubmitTitle?: string;
};

export const TrackerEntryForm = ({
  titleForm,
  userId,
  onSubmit,
  onClose,
  initialValuesForm,
  buttonCloseTitle = 'Cancel',
  buttonSubmitTitle = 'Save Time',
}: TrackerEntryFormProps) => {
  const { executeProjects, projectItems } = useProjectsByUserList();
  useEffect(() => {
    executeProjects({ userId });
  }, [userId]);

  const initialValues: TimeEntryValues = {
    [FIELD_TIME_ENTRY.DATE]: initialValuesForm?.DATE ?? new Date(),
    [FIELD_TIME_ENTRY.DURATION]: initialValuesForm?.DURATION ?? '00:00',
    [FIELD_TIME_ENTRY.DESCRIPTION]: initialValuesForm?.DESCRIPTION ?? '',
    [FIELD_TIME_ENTRY.PROJECT]: initialValuesForm?.PROJECT ?? '',
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
            <Stack direction="row" gap={3}>
              <CalendarPickerFormik
                field={FIELD_TIME_ENTRY.DATE}
                minDate={startOfMonth(subMonths(new Date(), 1))}
                disableFuture
                views={['day']}
              />
              <TimePicker
                value={values[FIELD_TIME_ENTRY.DURATION]}
                onChange={(value) => {
                  setFieldValue(`${FIELD_TIME_ENTRY.DURATION}`, value);
                }}
                {...formikPropsErrors(FIELD_TIME_ENTRY.DURATION, formik)}
              />
            </Stack>
            <Select
              label="Project"
              items={projectItems}
              value={values[FIELD_TIME_ENTRY.PROJECT]}
              {...formikPropsErrors(FIELD_TIME_ENTRY.PROJECT, formik)}
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              {...formikPropsErrors(FIELD_TIME_ENTRY.DESCRIPTION, formik)}
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
