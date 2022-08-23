import React, { Fragment, useState } from 'react';

import { IconButton, Stack, Tooltip } from '@mui/material';
import { Icon } from 'legos';
import { useAuth } from 'AuthProvider';
import { Role } from 'constants/types';
import { ApproveDialog } from 'components';

type UsersListActionProps = {
  id: string | number;
  firstName: string;
  lastName: string;
};

export const UsersListAction = ({
  id,
  firstName,
  lastName,
}: UsersListActionProps) => {
  const { user } = useAuth();
  const isManager = user.role.type === Role.Manager;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <Fragment key={id}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {isManager ? (
            <Stack direction="row">
              <Tooltip title="Edit">
                <IconButton>
                  <Icon icon="editOutlined" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete this user">
                <IconButton onClick={toggleOpenModal}>
                  <Icon icon="deleteOutline" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Watch profile">
                <IconButton>
                  <Icon icon="watch" />
                </IconButton>
              </Tooltip>
            </Stack>
          ) : (
            <Stack direction="row">
              <Tooltip title="Watch profile">
                <IconButton>
                  <Icon icon="watch" />
                </IconButton>
              </Tooltip>
            </Stack>
          )}
        </Stack>
        <ApproveDialog
          key={id}
          open={isOpenModal}
          onClose={toggleOpenModal}
          questionText={`Want to delete  ${firstName} ${lastName}?`}
        />
      </Fragment>
    </>
  );
};
