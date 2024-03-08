import React, { Fragment, useState } from 'react';

import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  Stack,
  Tooltip,
  Popper,
  Typography,
  ClickAwayListener,
  Button,
  Box,
} from '@mui/material';

import { Icon } from 'legos';
import { useNotification } from 'hooks';
import { UPDATE_USER_MUTATION } from 'api';
import { Maybe, Scalars } from 'types/GraphqlTypes';

type UsersListActionProps = {
  id?: Maybe<Scalars['ID']>;
  blocked?: Maybe<boolean>;
  firstName?: string;
  lastName?: string;
  isManager?: boolean;
  meId?: string;
};

export const UsersListAction = ({
  id,
  meId,
  blocked,
  lastName,
  firstName,
  isManager,
}: UsersListActionProps) => {
  const navigate = useNavigate();

  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const notification = useNotification();

  const [updateUserMutation] = useMutation(UPDATE_USER_MUTATION);

  const handleClickDeleteButton = (el: HTMLElement) => {
    setAnchorEl(anchorEl ? null : el);
    setIsPopperOpen(true);
  };
  const handleClickAway = () => {
    setAnchorEl(null);
    setIsPopperOpen(false);
  };

  const handleDeleteUser = () => {
    if (meId === id) {
      handleClickAway();
      return notification({
        message: `It’s not possible to block your account`,
        variant: 'warning',
      });
    }

    updateUserMutation({
      variables: {
        id,
        data: {
          blocked: blocked ? false : true,
        },
      },
    })
      .then(() => {
        notification({
          message: `The user is ${blocked ? 'unblocked' : 'blocked'}`,
          variant: 'success',
        });
        handleClickAway();
      })
      .catch((error) => {
        notification({ error });
      });
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
            <Tooltip title={`${blocked ? 'Unblock' : 'Block'} this user`}>
              <IconButton
                onClick={(e) => handleClickDeleteButton(e.currentTarget)}
              >
                <Icon icon="block" />
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
                {`${blocked ? 'Unblock' : 'Block'} ${firstName} ${lastName}`}?
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
                  onClick={handleDeleteUser}
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
