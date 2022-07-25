import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { ModalSelect } from '../../legos/ModalSelect';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'common.lightBackground',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};
type ManualEntryFormProps = {
  open: boolean;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
};
export const ManualEntryForm = ({ open, onClose }: ManualEntryFormProps) => {
  const [time, setTime] = useState('');
  // TODO add date and project options from BACKEND
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const itemSelectProject = [
    { label: 'softbee', value: '1s' },
    { label: 'demigos', value: '2s' },
  ];
  return (
    <div>
      <Typography>New Entry</Typography>
      <Modal
        title={'Title'}
        open={open}
        closeAfterTransition
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{
              textAlign: 'center',
            }}
          >
            New time entry for {date}
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            Project/Task
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
            maxRows={8}
            id="description-input"
            placeholder="Description"
          />
          <Box sx={{ marginTop: '20px' }}>
            <Button
              sx={{ marginRight: '10px' }}
              variant="contained"
              color="success"
            >
              Save Time
            </Button>
            <Button
              sx={{ bgcolor: 'white', color: 'common.grey' }}
              variant="outlined"
              onClick={onClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
