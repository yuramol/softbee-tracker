import React from 'react';
import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { useNormalizedTrackers } from 'hooks';
import { Stack } from '@mui/system';

type VacationEntryModalFormProps = {
  open: boolean;
  onClose: () => void;
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

const vacationModalHead = ['Date', 'Description', ''];

export const VacationEntryModalForm = ({
  open,
  onClose,
}: VacationEntryModalFormProps) => {
  const { trackers } = useNormalizedTrackers({
    user: { id: { in: ['38'] } },
  });

  return (
    <Modal open={open} closeAfterTransition onClose={onClose}>
      <>
        {open && (
          <Stack sx={modalStyle}>
            <Stack mb={2}>
              <Typography variant="h6">Approve vacations</Typography>
            </Stack>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {vacationModalHead.map((item, i) => (
                      <TableCell sx={{ fontWeight: 600 }} key={i}>
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody style={{ verticalAlign: 'top' }}>
                  {trackers.map(({ date, trackersByProject }) =>
                    trackersByProject.map(({ trackers }) =>
                      trackers.map(({ id, attributes }) => (
                        <TableRow
                          key={id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ width: 125 }}
                          >
                            {format(new Date(date), 'd MMM y')}
                          </TableCell>
                          <TableCell>
                            <Typography>{attributes?.description}</Typography>
                          </TableCell>
                          <TableCell>
                            <Stack direction="row" gap={1}>
                              <Button
                                color="success"
                                variant="contained"
                                sx={{
                                  textTransform: 'none',
                                }}
                              >
                                Approve
                              </Button>
                              <Button
                                color="error"
                                variant="contained"
                                sx={{
                                  textTransform: 'none',
                                }}
                              >
                                Reject
                              </Button>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        )}
      </>
    </Modal>
  );
};
