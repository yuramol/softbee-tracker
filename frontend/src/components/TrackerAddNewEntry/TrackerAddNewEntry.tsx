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
  const [time, setTime] = useState('');
  const { days, currentDay } = useCurrentWeek(new Date());

  // TODO Add projects from backend
  const itemSelectProject = [{ label: 'softbee' }, { label: 'demigos' }];

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
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Grid sx={modalStyle}>
            <Typography variant="h6" marginBottom="10px">
              {`New entry for ${days[+currentDay - 1].day}, ${
                days[+currentDay - 1].date
              }`}
            </Typography>
            <Grid
              marginTop="20px"
              display="flex"
              justifyContent="space-between"
            >
              <ModalSelect label={'Project'} items={itemSelectProject} />
              <TextField
                value={time}
                type="time"
                variant="outlined"
                sx={{ width: '40%' }}
                onChange={(e) => setTime(e.target.value || '00:00')}
              />
            </Grid>
            <TextField
              placeholder="Description"
              sx={{ marginTop: 2 }}
              fullWidth
              multiline
              rows={4}
            />
            <Grid marginTop="20px">
              <Button sx={{ mr: '10px' }} variant="contained">
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
      </Modal>
    </>
  );
};
