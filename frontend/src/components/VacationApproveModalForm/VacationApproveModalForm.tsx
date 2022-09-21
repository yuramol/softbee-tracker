import React, { useState } from 'react';
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
import { Button, Icon } from 'legos';
import { useMutation } from '@apollo/client';
import { UPDATE_TRACKER_BY_ID_MUTATION } from 'api';
import { Maybe } from 'graphql/jsutils/Maybe';

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

const vacationModalHead = ['Date', 'Description', 'Status', ''];

export const VacationApproveModalForm = () => {
  const { trackers } = useNormalizedTrackers({
    user: { id: { in: ['46'] } },
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

  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <Button
        title="Vacation approve"
        variant="contained"
        fullWidth
        onClick={toggleOpenModal}
      />
      <Modal open={isOpenModal} closeAfterTransition onClose={toggleOpenModal}>
        <>
          {isOpenModal && (
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
                        trackers.map(({ id, attributes }) => {
                          return (
                            <TableRow
                              key={id}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
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
                                <Typography>
                                  {attributes?.description}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography>
                                  {attributes?.live_status === 'start' ? (
                                    <Icon color="success" icon="checkCircle" />
                                  ) : attributes?.live_status === 'pause' ? (
                                    <Icon color="error" icon="highlightOff" />
                                  ) : (
                                    <></>
                                  )}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Stack direction="row" gap={1}>
                                  <Button
                                    color="success"
                                    variant="contained"
                                    title="Approve"
                                    disabled={
                                      attributes?.live_status === 'start'
                                    }
                                    sx={{
                                      textTransform: 'none',
                                    }}
                                    onClick={() => {
                                      handleApprove(id);
                                    }}
                                  />
                                  <Button
                                    color="error"
                                    variant="contained"
                                    title="Reject"
                                    disabled={
                                      attributes?.live_status === 'pause'
                                    }
                                    sx={{
                                      textTransform: 'none',
                                    }}
                                    onClick={() => handleReject(id)}
                                  />
                                </Stack>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          )}
        </>
      </Modal>
    </>
  );
};
