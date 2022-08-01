import React, { useState } from 'react';
import {
  Button,
  Typography,
  Modal,
  TextField,
  Tooltip,
  Grid,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import AddIcon from '@mui/icons-material/Add';
import enGb from 'date-fns/locale/en-GB';

import { Formik, Field, Form, useFormik } from 'formik';
import * as Yup from 'yup';

import { ModalSelect } from '../../legos/ModalSelect';
import { useCurrentWeek } from '../../hooks';

const modalStyle = {
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

export const TrackerAddNewEntry = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  // const [time, setTime] = useState('');
  const { days, currentDay } = useCurrentWeek(new Date());
  const [value, setValue] = React.useState<Date | null>(new Date());

  // TODO Add projects from backend
  const itemSelectProject = [{ label: 'softbee' }, { label: 'demigos' }];

  const formik = useFormik({
    initialValues: {
      time: '',
      description: '',
      project: '',
    },
    validationSchema: Yup.object({
      // firstName: Yup.string()
      //   .max(15, 'Must be 15 characters or less')
      //   .required('Required'),
      // lastName: Yup.string()
      //   .max(20, 'Must be 20 characters or less')
      //   .required('Required'),
      // email: Yup.string().email('Invalid email address').required('Required'),
      // password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <Tooltip title='Add New Entry'>
        <Button
          variant='contained'
          onClick={() => setIsOpenModal(!isOpenModal)}
        >
          <AddIcon />
        </Button>
      </Tooltip>
      <Modal
        open={isOpenModal}
        closeAfterTransition
        onClose={() => setIsOpenModal(!isOpenModal)}
      >
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          height='100vh'
        >
          <Grid sx={modalStyle}>
            <form onSubmit={formik.handleSubmit}>
              <Typography variant='h6' marginBottom='10px'>
                {`New time entry`}
              </Typography>
              <Grid
                item
                marginTop='20px'
                display='flex'
                justifyContent='space-between'
                spacing={2}
              >
                <LocalizationProvider
                  adapterLocale={enGb}
                  dateAdapter={AdapterDateFns}
                >
                  <DesktopDatePicker
                    disablePast
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
                <TextField
                  id='time'
                  // value={time}
                  type='time'
                  variant='outlined'
                  sx={{ width: '40%' }}
                  // onChange={(e) => setTime(e.target.value || '00:00')}
                  {...formik.getFieldProps('time')}
                />
              </Grid>
              <ModalSelect
                id='project'
                label={'Project'}
                items={itemSelectProject}
                {...formik.getFieldProps('project')}
              />
              <TextField
                id='description'
                placeholder='Description'
                sx={{ marginTop: 2 }}
                fullWidth
                multiline
                rows={4}
                {...formik.getFieldProps('description')}
              />
              <Grid marginTop='20px'>
                <Button sx={{ mr: '10px' }} variant='contained' type='submit'>
                  Save Time
                </Button>
                <Button
                  variant='outlined'
                  onClick={() => setIsOpenModal(!isOpenModal)}
                >
                  Cancel
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};
