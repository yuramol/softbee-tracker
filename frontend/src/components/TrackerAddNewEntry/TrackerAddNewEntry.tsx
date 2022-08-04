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

import { SelectField } from '../../legos/SelectField';
import { CalendarPickerFormik } from 'legos/CalendarPicker';

const modalStyle = {
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 3,
};

const FIELD_TIME_ENTRY = {
  date: 'DATE',
  time: 'TIME',
  description: 'DESCRIPTION',
  project: 'PROJECT',
} as const;
export interface TimeEntryValues {
  [FIELD_TIME_ENTRY.date]: Date;
  [FIELD_TIME_ENTRY.time]: string;
  [FIELD_TIME_ENTRY.description]: string;
  [FIELD_TIME_ENTRY.project]: string;
}

export const TrackerAddNewEntry = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  // TODO Add projects from backend
  const itemSelectProject = [{ label: 'softbee' }, { label: 'demigos' }];
  const initialValues: TimeEntryValues = {
    [FIELD_TIME_ENTRY.date]: new Date(),
    [FIELD_TIME_ENTRY.time]: '',
    [FIELD_TIME_ENTRY.description]: '',
    [FIELD_TIME_ENTRY.project]: '',
  };
  const formik = useFormik<TimeEntryValues>({
    initialValues,
    onSubmit: (values) => {
      console.log('===', values);
    },
  });
  const { handleChange, handleSubmit } = formik;
  return (
    <>
      <Tooltip title="Add New Entry">
        <Button
          variant="contained"
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
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Grid container sx={modalStyle}>
                <Grid item xs={12}>
                  <Typography variant="h6" margin="10px">
                    New time entry
                  </Typography>
                </Grid>

                <Grid item container xs={12}>
                  <Grid
                    container
                    margin="10px"
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Grid item xs={8}>
                      <CalendarPickerFormik field={FIELD_TIME_ENTRY.date} />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        id={FIELD_TIME_ENTRY.time}
                        name={FIELD_TIME_ENTRY.time}
                        type="time"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid item margin="10px" xs={12}>
                    <SelectField
                      id={FIELD_TIME_ENTRY.project}
                      name={FIELD_TIME_ENTRY.project}
                      label="Project"
                      items={itemSelectProject}
                    />
                  </Grid>
                  <Grid item margin="10px" xs={12}>
                    <TextField
                      id={FIELD_TIME_ENTRY.description}
                      name={FIELD_TIME_ENTRY.description}
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Description"
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

                <Grid item margin="10px" xs={12}>
                  <Button sx={{ mr: '10px' }} variant="contained" type="submit">
                    Save Time
                  </Button>
                  <Button
                    variant="outlined"
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
