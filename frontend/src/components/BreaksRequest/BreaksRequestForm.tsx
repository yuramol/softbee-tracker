import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { eachDayOfInterval, endOfYear, isWeekend, startOfYear } from 'date-fns';

import { useAuthUser, useBreaks } from 'hooks';
import { Icon, RangeCalendar } from 'legos';
import { getFormattedDate, toUpperCaseFirst } from 'helpers';
import { Breaks } from 'constant';
import { useFormik } from 'formik';
import { BreaksRequestFields, BreaksRequestFormProps } from './types';
import { IconsNames } from 'legos/Icon';

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

export const BreaksRequestForm: React.FC<BreaksRequestFormProps> = ({
  onClose,
}) => {
  const { user } = useAuthUser();
  const { breaks, breaksChoices, loading } = useBreaks(
    {},
    {
      user: {
        id: {
          eq: user.id,
        },
      },
      date: {
        between: [
          getFormattedDate(startOfYear(new Date())),
          getFormattedDate(endOfYear(new Date())),
        ],
      },
    }
  );

  const [selectedDates, setSelectedDates] = useState([
    getFormattedDate(new Date()),
  ]);

  const getIcon = (value?: string) => {
    let icon: IconsNames = 'moneyOff';

    if (toUpperCaseFirst(Breaks.Vacation) === value) {
      icon = 'sailing';
    } else if (toUpperCaseFirst(Breaks.Sickness) === value) {
      icon = 'medicalServices';
    }

    return <Icon icon={icon} />;
  };

  const breaksDateArray = eachDayOfInterval({
    start: new Date(selectedDates[0]),
    end:
      selectedDates.length > 1
        ? new Date(selectedDates[1])
        : new Date(selectedDates[0]),
  }).filter((date) => !isWeekend(date));

  const initialValues = {
    [BreaksRequestFields.User]: '',
    [BreaksRequestFields.Break]: '',
    [BreaksRequestFields.Date]: getFormattedDate(new Date()),
    [BreaksRequestFields.Duration]: '00:00:00.000',
    [BreaksRequestFields.Comment]: '',
  };

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: (values) => {
      const data = {
        ...values,
        [BreaksRequestFields.User]: user.id,
      };

      console.log(data);
    },
  });

  const { values, handleChange, handleSubmit, setFieldValue } = formik;

  useEffect(() => {
    setFieldValue(
      BreaksRequestFields.Break,
      breaksChoices?.find(
        ({ label }) => label === toUpperCaseFirst(Breaks.Vacation)
      )?.value
    );
  }, [loading]);

  const VACATION_DAYS = 30;
  const SICKNESS_DAYS = 5;

  const selectedBreak = breaks?.find(
    ({ id }) => id === values[BreaksRequestFields.Break]
  );

  const selectedBreakType = selectedBreak?.attributes?.name.toLowerCase();
  const selectedUsedBreakDays = selectedBreak?.attributes?.trackers?.data
    .length as number;

  const breaksDaysUserHave =
    selectedBreakType === Breaks.Vacation
      ? VACATION_DAYS - selectedUsedBreakDays
      : selectedBreakType === Breaks.Sickness
      ? SICKNESS_DAYS - selectedUsedBreakDays
      : 0;

  return (
    <Stack component="form" gap={4} sx={modalStyle} onSubmit={handleSubmit}>
      <Typography variant="h6">Request leave</Typography>
      <Stack
        direction="row"
        alignItems="center"
        border={(t) => `1px solid ${t.palette.primary.main}`}
        borderRadius={1}
        gap={2}
        p={2}
      >
        <Icon icon="info" color="primary" />
        {selectedBreakType !== Breaks.Unpaid ? (
          <Typography>
            You request for{' '}
            <Typography component={'span'} fontWeight="600">
              {breaksDateArray.length} days
            </Typography>{' '}
            of paid time off, from{' '}
            <Typography component={'span'} fontWeight="600">
              {breaksDaysUserHave} days
            </Typography>{' '}
            do you have.
          </Typography>
        ) : (
          <Typography>
            You request for{' '}
            <Typography component={'span'} fontWeight="600">
              {breaksDateArray.length} days
            </Typography>{' '}
            of unpaid time off.
          </Typography>
        )}
      </Stack>
      <ButtonGroup fullWidth>
        {breaksChoices?.map(({ label, value }) => (
          <Button
            key={value}
            variant={
              value === values[BreaksRequestFields.Break]
                ? 'contained'
                : 'outlined'
            }
            startIcon={getIcon(label)}
            onClick={() => {
              setFieldValue(BreaksRequestFields.Break, value);
            }}
          >
            {label}
          </Button>
        ))}
      </ButtonGroup>
      <RangeCalendar
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
      />
      <TextField label="Comment" fullWidth multiline rows={4} />
      <Stack direction="row" gap={2} justifyContent="flex-end">
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </Stack>
    </Stack>
  );
};
