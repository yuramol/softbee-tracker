import React, { useEffect } from 'react';
import { Stack, Typography } from '@mui/material';

import {
  Enum_Tracker_Status,
  UsersPermissionsUserEntity,
  UsersPermissionsUserEntityResponseCollection,
} from 'types/GraphqlTypes';
import { Avatar, NavLink, PulseDot } from 'legos';

import { UsersListAction } from './UsersListAction';
import { useNormalizedTrackers } from 'hooks';
import { ApolloQueryResult, OperationVariables } from '@apollo/client';

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
            width="300px"
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
                {`${attributes?.firstName} ${attributes?.lastName?.charAt(0)}.`}
              </NavLink>
              <Typography fontSize="10px">
                {`${attributes?.role?.data?.attributes?.name} | ${attributes?.positions}`}
              </Typography>
            </div>
          </Stack>
          <UsersListAction
            id={id}
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
