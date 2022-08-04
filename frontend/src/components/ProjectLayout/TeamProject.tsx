import React, { useState } from 'react';
import {
  Button,
  Typography,
  TextField,
  Grid,
  IconButton,
  InputLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useFormik, FormikContext } from 'formik';

import { ModalSelect } from 'legos';

const modalStyle = {
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

interface TimeEntryValues {
  manager: string;
  hourlyRate: string;
  employee: string;
  rate: string;
}

export const TeamProject = () => {
  const formik = useFormik<TimeEntryValues>({
    initialValues: {
      manager: '',
      hourlyRate: '',
      employee: '',
      rate: '',
    },
    onSubmit: (values) => {
      console.log('===', values);
    },
  });

  const { handleChange, handleSubmit } = formik;

  // TODO Add manager from backend
  const itemSelectManager = [{ label: 'Andriy' }, { label: 'Stas' }];

  // TODO Add employee from backend
  const itemSelectEmployee = [
    { label: 'Serhii' },
    { label: 'Stas' },
    { label: 'Oleg' },
    { label: 'Michael' },
  ];

  return (
    <FormikContext.Provider value={formik}>
      <form onSubmit={handleSubmit} style={{ height: '100%' }}>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          height='100%'
        >
          <Grid sx={modalStyle}>
            <Grid container direction='row' justifyContent='space-between'>
              <Typography variant='h6'>Team</Typography>
              <IconButton>
                <CloseIcon />
              </IconButton>
            </Grid>
            <InputLabel sx={{ marginTop: 2 }}>
              Project manager<span style={{ color: 'red' }}>*</span>
            </InputLabel>
            <ModalSelect
              id='manager'
              name='manager'
              label='Manager'
              size='small'
              items={itemSelectManager}
            />
            <TextField
              id='hourlyRate'
              name='hourlyRate'
              placeholder='Hourly rate agreements'
              size='small'
              sx={{ marginTop: 2 }}
              fullWidth
              multiline
              onChange={handleChange}
            />
            <Grid
              container
              spacing={1}
              item
              display='flex'
              justifyContent='space-between'
              marginTop='20px'
            >
              <Grid item xs={8}>
                <InputLabel>
                  Employee<span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <ModalSelect
                  id='employee'
                  name='employee'
                  label='Employee'
                  size='small'
                  items={itemSelectEmployee}
                />
              </Grid>
              <Grid
                item
                display='flex'
                flexDirection='row'
                alignItems='flex-end'
                xs={4}
              >
                <Grid>
                  <InputLabel>
                    Rate, $<span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <TextField
                    id='rate'
                    name='rate'
                    size='small'
                    sx={{ marginTop: 2 }}
                    fullWidth
                    multiline
                    onChange={handleChange}
                  />
                </Grid>
                <IconButton>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </Grid>
            </Grid>

            <Grid marginTop={2} display='flex' justifyContent='flex-end'>
              <Button sx={{ mr: '10px' }} variant='outlined'>
                Back
              </Button>
              <Button variant='contained' type='submit'>
                Next
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormikContext.Provider>
  );
};
