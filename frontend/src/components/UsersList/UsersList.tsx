import React, { useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import { ApolloQueryResult, OperationVariables } from '@apollo/client';

import {
  Enum_Tracker_Status,
  UsersPermissionsUserEntity,
  UsersPermissionsUserEntityResponseCollection,
} from 'types/GraphqlTypes';
import { useNormalizedTrackers } from 'hooks';
import { Avatar, NavLink, PulseDot } from 'legos';
import { UsersListAction } from './UsersListAction';

type Props = {
  usersList?: UsersPermissionsUserEntity[];
  isManager?: boolean;
  meId?: string;
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<
    ApolloQueryResult<{
      usersPermissionsUsers: UsersPermissionsUserEntityResponseCollection;
    }>
  >;
};

export const UsersList = ({ usersList, isManager, meId, refetch }: Props) => {
  const filters = {
    status: { eq: Enum_Tracker_Status.New },
  };

  const { fetchTrackers, normalizedTrackers } = useNormalizedTrackers(
    filters,
    false
  );

  const isUserRequestVacation = (id: string | undefined) => {
    let isUserHasRequest;
    normalizedTrackers.forEach(({ trackersByProject }) => {
      trackersByProject.forEach(({ trackers }) => {
        isUserHasRequest = trackers.some(
          (item) => item.attributes?.user?.data?.id === id
        );
      });
    });

    return isUserHasRequest || null;
  };
  useEffect(() => {
    fetchTrackers({
      variables: { filters },
    });
  }, [usersList]);

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
            width="100%"
            maxWidth="300px"
          >
            <Stack position="relative">
              <Avatar
                firstName={attributes?.firstName}
                lastName={attributes?.lastName}
                avatar={
                  attributes?.avatar?.data?.attributes?.url
                    ? `${process.env.REACT_APP_URI}${attributes?.avatar.data?.attributes?.url}`
                    : undefined
                }
              />
              {isUserRequestVacation(`${id}`) && (
                <PulseDot top={-2} right={-2} />
              )}
            </Stack>
            <div>
              <NavLink to={`/profile/${id}`} state={{ edit: false }}>
                {`${attributes?.firstName} ${attributes?.lastName?.charAt(
                  0
                )}. ${attributes?.blocked ? '(blocked)' : ''}`}
              </NavLink>
              <Typography fontSize="10px">
                {`${attributes?.role?.data?.attributes?.name} ${
                  attributes?.positions ? '|' : ''
                } ${attributes?.positions ?? ''}`}
              </Typography>
            </div>
          </Stack>
          <UsersListAction
            id={id}
            blocked={attributes?.blocked}
            firstName={attributes?.firstName}
            lastName={attributes?.lastName}
            isManager={isManager}
            meId={meId}
            refetch={refetch}
          />
        </Stack>
      ))}
    </>
  );
};
