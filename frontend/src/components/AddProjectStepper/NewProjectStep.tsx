import React, { forwardRef, useState } from 'react';
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
import { Formik, FormikProps } from 'formik';

import { CalendarPickerFormik } from 'legos';
import { AddNewProjectValues, FIELD_NEW_PROJECT_ENTRY } from './AddNewProject';

const paymentTypes = [
  {
    label: 'Time & Material',
    value: 'timeMaterial',
  },
  {
    label: 'Fixed Price',
    value: 'fixedPrice',
  },
  {
    label: 'Non profit',
    value: 'nonProfit',
  },
];

export const NewProjectStep = forwardRef<FormikProps<AddNewProjectValues>>(
  (_, ref) => {
    const initialValues: AddNewProjectValues = {
      [FIELD_NEW_PROJECT_ENTRY.payment_method]: paymentTypes[0].value,
      [FIELD_NEW_PROJECT_ENTRY.name]: '',
      [FIELD_NEW_PROJECT_ENTRY.client]: '',
      [FIELD_NEW_PROJECT_ENTRY.startDate]: new Date(),
      [FIELD_NEW_PROJECT_ENTRY.endDate]: new Date(),
    };
    const [isOpenModal, setIsOpenModal] = useState(true);

    return (
      <Formik
        innerRef={ref}
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log('values===', values);
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <form>
            <Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">New project</Typography>
                <IconButton onClick={() => setIsOpenModal(!isOpenModal)}>
                  <CloseIcon />
                </IconButton>
              </Stack>

              <Stack mt={3} mb={1} gap={3}>
                <ButtonGroup size="small" fullWidth>
                  {paymentTypes.map(({ label, value }) => (
                    <Button
                      key={value}
                      size="large"
                      variant={
                        value === values.payment_method
                          ? 'contained'
                          : 'outlined'
                      }
                      onClick={() => {
                        console.log('====', value);
                        setFieldValue('payment_method', value);
                      }}
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
                    <CalendarPickerFormik
                      field={FIELD_NEW_PROJECT_ENTRY.endDate}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </form>
        )}
      </Formik>
    );
  }
);

NewProjectStep.displayName = 'NewProjectStep';
