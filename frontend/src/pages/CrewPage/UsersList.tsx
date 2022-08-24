import React, { Fragment } from 'react';

import { Link, Stack, Typography } from '@mui/material';
import { Avatar } from 'legos';
import { Loader } from 'components/Loader';
import { UsersListAction } from './UsersListAction';
import { Maybe, Scalars } from 'types/GraphqlTypes';

type UsersListType = {
  id: Maybe<Scalars['ID']>;
  firstName: string;
  attributes: any;
};
type UsersListProps = {
  usersList: UsersListType[];
};

export const UsersList = ({ usersList }: UsersListProps) => {
  return (
    <>
      {usersList ? (
        usersList.map(({ id, attributes }) => (
          <Fragment key={id}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack
                m={2}
                direction="row"
                alignItems="center"
                spacing={1}
                width="300px"
              >
                <Avatar
                  firstName={attributes.firstName}
                  lastName={attributes.lastName}
                  avatar={`https://dev.strapi.track.softbee.io${attributes.avatar.data?.attributes?.url}`}
                />
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Stack>
                    <Link href={`/profile/view/${id}`} underline="none">
                      {`${attributes.firstName} ${attributes.lastName?.charAt(
                        0
                      )}.`}
                    </Link>
                    <Typography fontSize="10px">
                      {`${attributes.role.data.attributes.name} | ${attributes.position}`}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <UsersListAction
                id={id}
                firstName={attributes.firstName}
                lastName={attributes.lastName}
              />
            </Stack>
          </Fragment>
        ))
      ) : (
        <Loader />
      )}
    </>
  );
};
