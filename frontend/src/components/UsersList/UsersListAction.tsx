import React, { Fragment, useState } from 'react';

import { Link } from 'react-router-dom';
import { Icon } from 'legos';
import { useAuth } from 'AuthProvider';
import { Role } from 'constants/types';
import { useMutation } from '@apollo/client';
import { DELETE_USERS_PERMISSIONS_USER } from 'api';
import { Maybe, Scalars } from 'types/GraphqlTypes';
import { useNotification } from 'hooks';
import {
  IconButton,
  Stack,
  Tooltip,
  Popper,
  Typography,
  ClickAwayListener,
  Button,
} from '@mui/material';

type UsersListActionProps = {
  id: Maybe<Scalars['ID']>;
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
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const notification = useNotification();
  const [deleteUsersPermissionsUser] = useMutation(
    DELETE_USERS_PERMISSIONS_USER
  );
  const handleClickDeleteButton = (el: HTMLElement) => {
    setAnchorEl(anchorEl ? null : el);
    setIsPopperOpen(true);
  };
  const handleClickAway = () => {
    setAnchorEl(null);
    setIsPopperOpen(false);
  };
  const deleteUser = () => {
    deleteUsersPermissionsUser({ variables: { id } });
    handleClickAway();
    notification({
      message: `${firstName} ${lastName} deleted`,
      variant: 'warning',
    });
  };

  return (
    <Fragment key={id}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {isManager ? (
          <Stack direction="row">
            <Tooltip title="Edit">
              <Link to={`/profile/edit/${id}`}>
                <IconButton>
                  <Icon icon="editOutlined" />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Delete this user">
              <IconButton
                onClick={(e) => handleClickDeleteButton(e.currentTarget)}
              >
                <Icon icon="deleteOutline" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Watch profile">
              <Link to={`/profile/view/${id}`}>
                <IconButton>
                  <Icon icon="watch" />
                </IconButton>
              </Link>
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
      {isPopperOpen && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Popper open={isPopperOpen} anchorEl={anchorEl}>
            <Stack
              bgcolor="background.paper"
              border="1px solid"
              borderRadius={1}
              p={2}
              textAlign="center"
            >
              <Typography marginBottom={2}>Are you sure to delete </Typography>
              <Typography variant="body2" marginBottom={2}>
                {`${firstName} ${lastName}`}?
              </Typography>
              <Stack direction="row" justifyContent="center" gap={2}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleClickAway}
                >
                  No
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={deleteUser}
                >
                  Yes
                </Button>
              </Stack>
            </Stack>
          </Popper>
        </ClickAwayListener>
      )}
    </Fragment>
  );
};
