import React, { useState } from 'react';
import {
  Button,
  Typography,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

export const SummaryProject = () => {
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

  const text = `Client: ${10}`;

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
              <Typography variant='h6'>Summary</Typography>
              <IconButton>
                <CloseIcon />
              </IconButton>
            </Grid>

            <Typography variant='subtitle1' component='div'>
              Please review the information before creation
            </Typography>
            <List>
              {/* {[1, 2, 3].map((el) => (
                <ListItem sx={{ paddingLeft: 0 }} key={el}>
                  <ListItemText primary={el} />
                </ListItem>
              ))} */}
              <ListItem sx={{ paddingLeft: 0 }}>
                <ListItemText primary='Project name:' />
              </ListItem>
              <ListItem sx={{ paddingLeft: 0 }}>
                <ListItemText primary={text} />
              </ListItem>
            </List>

            <Grid marginTop={2} display='flex' justifyContent='flex-end'>
              <Button sx={{ mr: '10px' }} variant='outlined'>
                Back
              </Button>
              <Button variant='contained' type='submit'>
                Create
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormikContext.Provider>
  );
};
