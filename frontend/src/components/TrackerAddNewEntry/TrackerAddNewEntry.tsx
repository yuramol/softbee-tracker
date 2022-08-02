import React, { useState } from 'react';
import {
  Button,
  Typography,
  Modal,
  TextField,
  Tooltip,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useFormik, FormikContext } from 'formik';

import { ModalSelect } from '../../legos/ModalSelect';
import { CalendarPicker } from 'legos/CalendarPicker';

const modalStyle = {
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

interface TimeEntryValues {
  date: string;
  time: string;
  description: string;
  project: string;
}

export const TrackerAddNewEntry = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  // TODO Add projects from backend
  const itemSelectProject = [{ label: 'softbee' }, { label: 'demigos' }];

  const formik = useFormik<TimeEntryValues>({
    initialValues: {
      date: '',
      time: '',
      description: '',
      project: '',
    },
    onSubmit: (values) => {
      console.log('===', values);
    },
  });

  const { handleChange, handleSubmit } = formik;

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
        <FormikContext.Provider value={formik}>
          <form onSubmit={handleSubmit} style={{ height: '100%' }}>
            <Grid
              container
              justifyContent='center'
              alignItems='center'
              height='100%'
            >
              <Grid sx={modalStyle}>
                <Typography variant='h6' marginBottom='10px'>
                  New time entry
                </Typography>
                <Grid
                  item
                  marginTop='20px'
                  display='flex'
                  justifyContent='space-between'
                >
                  <CalendarPicker />
                  <TextField
                    id='time'
                    name='time'
                    type='time'
                    variant='outlined'
                    sx={{ width: '60%', marginLeft: 2 }}
                    onChange={handleChange}
                  />
                </Grid>
                <ModalSelect
                  id='project'
                  name='project'
                  label='Project'
                  items={itemSelectProject}
                />
                <TextField
                  id='description'
                  name='description'
                  fullWidth
                  multiline
                  rows={4}
                  placeholder='Description'
                  sx={{ marginTop: 2 }}
                  onChange={handleChange}
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
              </Grid>
            </Grid>
          </form>
        </FormikContext.Provider>
      </Modal>
    </>
  );
};
