import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Typography,
  TextField,
  IconButton,
  InputLabel,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik, FormikContext } from 'formik';

import { CalendarPickerFormik } from 'legos';

type NewProjectStepProps = {
  handleNext: () => void;
};

const FIELD_NEW_PROJECT_ENTRY = {
  profit: 'profit',
  name: 'name',
  client: 'client',
  startDate: 'startDate',
  endDate: 'endDate',
} as const;

interface NewProjectStepEntryValues {
  [FIELD_NEW_PROJECT_ENTRY.profit]: string;
  [FIELD_NEW_PROJECT_ENTRY.name]: string;
  [FIELD_NEW_PROJECT_ENTRY.client]: string;
  [FIELD_NEW_PROJECT_ENTRY.startDate]: Date;
  [FIELD_NEW_PROJECT_ENTRY.endDate]: Date;
}

const paymentTypes = [
  {
    label: 'Time & Material',
    value: 'Time & Material',
  },
  {
    label: 'Fixed Price',
    value: 'Fixed Price',
  },
  {
    label: 'Non Profit',
    value: 'Non Profit',
  },
];

export const NewProjectStep = ({ handleNext }: NewProjectStepProps) => {
  const initialValues: NewProjectStepEntryValues = {
    [FIELD_NEW_PROJECT_ENTRY.profit]: 'Time & Material',
    [FIELD_NEW_PROJECT_ENTRY.name]: '',
    [FIELD_NEW_PROJECT_ENTRY.client]: '',
    [FIELD_NEW_PROJECT_ENTRY.startDate]: new Date(),
    [FIELD_NEW_PROJECT_ENTRY.endDate]: new Date(),
  };
  const formik = useFormik<NewProjectStepEntryValues>({
    initialValues,
    onSubmit: (values) => {
      console.log('===', values);
    },
  });

  const [isOpenModal, setIsOpenModal] = useState(true);

  const { handleChange, handleSubmit, setFieldValue } = formik;

  const [paymentBy, setPaymentBy] = useState(paymentTypes[0]);
  const handlePaymentType = (index: number) => {
    setPaymentBy(paymentTypes[index]);
    setFieldValue(FIELD_NEW_PROJECT_ENTRY.profit, paymentTypes[index].label);
  };

  const handleNextWindow = () => {
    handleNext();
    handleSubmit();
  };

  return (
    <FormikContext.Provider value={formik}>
      <form onSubmit={handleSubmit}>
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">New project</Typography>
            <IconButton onClick={() => setIsOpenModal(!isOpenModal)}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack my={3} gap={3}>
            <ButtonGroup size="small" fullWidth>
              {paymentTypes.map(({ label, value }, i) => (
                <Button
                  key={value}
                  size="large"
                  variant={paymentBy.value === value ? 'contained' : 'outlined'}
                  onClick={() => handlePaymentType(i)}
                >
                  {label}
                </Button>
              ))}
            </ButtonGroup>
            <TextField
              id={FIELD_NEW_PROJECT_ENTRY.name}
              name={FIELD_NEW_PROJECT_ENTRY.name}
              label="Name"
              multiline
              onChange={handleChange}
            />
            <TextField
              id={FIELD_NEW_PROJECT_ENTRY.client}
              name={FIELD_NEW_PROJECT_ENTRY.client}
              label="Client"
              multiline
              onChange={handleChange}
            />

            <Stack direction="row" justifyContent="space-between">
              <Stack>
                <InputLabel>
                  Start Date<span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <CalendarPickerFormik
                  field={FIELD_NEW_PROJECT_ENTRY.startDate}
                />
              </Stack>
              <Stack>
                <InputLabel>
                  End Date<span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <CalendarPickerFormik field={FIELD_NEW_PROJECT_ENTRY.endDate} />
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              onClick={() => setIsOpenModal(!isOpenModal)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleNextWindow}
              variant="contained"
              type="submit"
            >
              Next
            </Button>
          </Stack>
        </Stack>
      </form>
    </FormikContext.Provider>
  );
};
