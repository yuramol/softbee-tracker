import React, { Fragment } from 'react';
import { Link, Stack, Typography } from '@mui/material';

import { Avatar, NavLink } from 'legos';
import { UsersListAction } from './UsersListAction';
import { UsersPermissionsUserEntity } from 'types/GraphqlTypes';

type Props = {
  usersList?: UsersPermissionsUserEntity[];
};

export const UsersList = ({ usersList }: Props) => {
  return (
    <>
      {usersList?.map(({ id, attributes }) => (
        <Stack
          key={id}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            mb={2}
            direction="row"
            alignItems="center"
            spacing={1}
            width="300px"
          >
            <Avatar
              firstName={attributes?.firstName}
              lastName={attributes?.lastName}
              avatar={
                attributes?.avatar.data?.attributes?.url
                  ? `${process.env.REACT_APP_URI}${attributes?.avatar.data?.attributes?.url}`
                  : undefined
              }
            />
            <Stack direction="row" alignItems="center" spacing={1}>
              <Stack>
                <Link to={`/profile/${id}`} component={NavLink}>
                  {`${attributes?.firstName} ${attributes?.lastName?.charAt(
                    0
                  )}.`}
                </Link>
                <Typography fontSize="10px">
                  {`${attributes?.role?.data?.attributes?.name} | ${attributes?.position}`}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <UsersListAction
            id={id}
            firstName={attributes?.firstName}
            lastName={attributes?.lastName}
          />
        </Stack>
      ))}
    </>
  );
};
