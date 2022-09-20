import React from 'react';
import {
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
import { useNormalizedTrackers, useNotification } from 'hooks';
import { Stack } from '@mui/system';
import { Button } from 'legos';
import { useMutation } from '@apollo/client';
import { UPDATE_TRACKER_BY_ID_MUTATION } from 'api';
import { Maybe } from 'graphql/jsutils/Maybe';

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

export const VacationApproveModalForm = ({
  open,
  onClose,
}: VacationEntryModalFormProps) => {
  const { trackers } = useNormalizedTrackers({
    user: { id: { in: ['38'] } },
  });

  const notification = useNotification();
  const [updateTracker] = useMutation(UPDATE_TRACKER_BY_ID_MUTATION);

  // TODO change live_status to status
  const handleApprove = (id: Maybe<string>) => {
    const data = { live_status: 'start' };
    updateTracker({
      variables: { id, data },
    }).then(() => {
      notification({
        message: 'The tracker was successfully updated',
        variant: 'info',
      });
    });
  };

  // TODO change live_status to status
  const handleReject = (id: Maybe<string>) => {
    const data = { live_status: 'pause' };
    updateTracker({
      variables: { id, data },
    }).then(() => {
      notification({
        message: 'The tracker was successfully updated',
        variant: 'info',
      });
    });
  };

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
                                title="Approve"
                                sx={{
                                  textTransform: 'none',
                                }}
                                onClick={() => handleApprove(id)}
                              />
                              <Button
                                color="error"
                                variant="contained"
                                title="Reject"
                                sx={{
                                  textTransform: 'none',
                                }}
                                onClick={() => handleReject(id)}
                              />
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
