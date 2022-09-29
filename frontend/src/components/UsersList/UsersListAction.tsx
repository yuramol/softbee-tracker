import React, { Fragment, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Icon } from 'legos';
import { useMutation } from '@apollo/client';
import { DELETE_USERS_PERMISSIONS_USER } from 'api';
import { Maybe, Scalars } from 'types/GraphqlTypes';
import { useAuthUser, useNotification } from 'hooks';
import {
  IconButton,
  Stack,
  Tooltip,
  Popper,
  Typography,
  ClickAwayListener,
  Button,
} from '@mui/material';
import { Box } from '@mui/system';

type UsersListActionProps = {
  id?: Maybe<Scalars['ID']>;
  firstName?: string;
  lastName?: string;
};

export const UsersListAction = ({
  id,
  firstName,
  lastName,
}: UsersListActionProps) => {
  const navigate = useNavigate();
  const { isManager, user } = useAuthUser();
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
    try {
      if (user.id === id) {
        handleClickAway();
        return notification({
          message: `It’s not possible to delete your account`,
          variant: 'warning',
        });
      }

      deleteUsersPermissionsUser({ variables: { id } });
      handleClickAway();
      notification({
        message: `${firstName} ${lastName} deleted`,
        variant: 'success',
      });
    } catch (error) {
      notification({ error });
    }
  };

  const goToProfile = () => {
    navigate(`/profile/${id}`, { state: { edit: isManager } });
  };

  return (
    <Fragment key={id}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {isManager ? (
          <Stack direction="row">
            <Tooltip title="Edit">
              <IconButton onClick={goToProfile}>
                <Icon icon="editOutlined" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete this user">
              <IconButton
                onClick={(e) => handleClickDeleteButton(e.currentTarget)}
              >
                <Icon icon="deleteOutline" />
              </IconButton>
            </Tooltip>
          </Stack>
        ) : (
          <Stack direction="row">
            <Tooltip title="Watch profile">
              <IconButton onClick={goToProfile}>
                <Icon icon="watch" />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      </Stack>
      {isPopperOpen && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Popper open={isPopperOpen} anchorEl={anchorEl}>
            <Box
              bgcolor="background.paper"
              border="1px solid"
              borderRadius={1}
              p={2}
              textAlign="center"
            >
              <Typography marginBottom={2}>
                Remove {`${firstName} ${lastName}`}?
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
            </Box>
          </Popper>
        </ClickAwayListener>
      )}
    </Fragment>
  );
};
