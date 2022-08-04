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
import { useFormik, FormikContext } from 'formik';

import { CalendarPicker } from 'legos/CalendarPicker';

const modalStyle = {
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

interface TimeEntryValues {
  name: string;
  client: string;
  date: string;
}

export const ProjectLayout = () => {
  const formik = useFormik<TimeEntryValues>({
    initialValues: {
      name: '',
      client: '',
      date: '',
    },
    onSubmit: (values) => {
      console.log('===', values);
    },
  });

  const { handleChange, handleSubmit } = formik;

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
              <Typography variant='h6'>New project</Typography>
              <IconButton>
                <CloseIcon />
              </IconButton>
            </Grid>
            <InputLabel sx={{ marginTop: 2 }}>
              Name<span style={{ color: 'red' }}>*</span>
            </InputLabel>
            <TextField
              id='name'
              name='name'
              size='small'
              fullWidth
              multiline
              onChange={handleChange}
            />
            <InputLabel sx={{ marginTop: 2 }}>
              Client<span style={{ color: 'red' }}>*</span>
            </InputLabel>
            <TextField
              id='client'
              name='client'
              size='small'
              placeholder='Select a client'
              fullWidth
              multiline
              onChange={handleChange}
            />
            <Grid
              item
              display='flex'
              justifyContent='space-between'
              marginTop='20px'
            >
              <Grid>
                <InputLabel>
                  Start Date<span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <CalendarPicker />
              </Grid>
              <Grid>
                <InputLabel>
                  End Date<span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <CalendarPicker />
              </Grid>
            </Grid>
            <Grid marginTop={2} display='flex' justifyContent='flex-end'>
              <Button sx={{ mr: '10px' }} variant='outlined'>
                Cancel
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
