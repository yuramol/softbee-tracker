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
import { useAuthUser, useNormalizedTrackers, useUpdateTracker } from 'hooks';
import { Stack } from '@mui/system';
import { Button, Icon } from 'legos';
import { Enum_Tracker_Status } from 'types/GraphqlTypes';

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
  const { user } = useAuthUser();
  const { trackers } = useNormalizedTrackers({
    user: { id: { in: [user.id] } },
    status: { eq: Enum_Tracker_Status.New },
  });

  const { updateTracker } = useUpdateTracker();

  const handleApprove = (id: string) => {
    const data = { status: Enum_Tracker_Status.Approved };
    updateTracker(id, data);
  };

  const handleReject = (id: string) => {
    const data = { status: Enum_Tracker_Status.Rejected };
    updateTracker(id, data);
  };

  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <Button
        title="Approve vacation"
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
                    {trackers?.map(({ id, attributes }) => {
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
                            {format(new Date(attributes?.date), 'd MMM y')}
                          </TableCell>
                          <TableCell>
                            <Typography>{attributes?.description}</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography>
                              {attributes?.status ===
                              Enum_Tracker_Status.Approved ? (
                                <Icon color="success" icon="checkCircle" />
                              ) : attributes?.status ===
                                Enum_Tracker_Status.Rejected ? (
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
                                  attributes?.status ===
                                  Enum_Tracker_Status.Approved
                                }
                                sx={{
                                  textTransform: 'none',
                                }}
                                onClick={() => {
                                  handleApprove(id!);
                                }}
                              />
                              <Button
                                color="error"
                                variant="contained"
                                title="Reject"
                                disabled={
                                  attributes?.status ===
                                  Enum_Tracker_Status.Rejected
                                }
                                sx={{
                                  textTransform: 'none',
                                }}
                                onClick={() => handleReject(id!)}
                              />
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
