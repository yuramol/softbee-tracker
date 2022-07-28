import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { ModalSelect } from '../../legos/ModalSelect';
import { useCurrentWeek } from '../../hooks';

const style = {
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
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        open={isOpenModal}
        closeAfterTransition
        onClose={() => setIsOpenModal(!isOpenModal)}
      >
        <Box sx={style}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            {`New entry for ${days[+currentDay - 1].day}, ${
              days[+currentDay - 1].date
            }`}
          </Typography>
          <Box marginTop="20px" display="flex" justifyContent="space-between">
            <ModalSelect label={'Project'} items={itemSelectProject} />
            <TextField
              sx={{ width: '40%' }}
              id="outlined-basic"
              variant="outlined"
              value={time}
              type="time"
              onChange={(e) => setTime(e.target.value || '00:00')}
            />
          </Box>
          <TextField
            sx={{ width: '100%', marginTop: 2 }}
            multiline
            rows={4}
            id="description-input"
            placeholder="Description"
          />
          <Box sx={{ marginTop: '20px' }}>
            <Button sx={{ mr: '10px' }} variant="contained">
              Save Time
            </Button>
            <Button
              variant="outlined"
              onClick={() => setIsOpenModal(!isOpenModal)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
