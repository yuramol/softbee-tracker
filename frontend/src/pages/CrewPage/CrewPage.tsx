import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';

import { Button } from 'legos';
import { PageProps } from 'pages/types';
import { CrewFilters } from './CrewFilters';
import { useAuthUser, useNormalizedUsers } from 'hooks';
import { MainWrapper, UsersList, NewUser, TimeInspector } from 'components';

const CrewPage: React.FC<PageProps> = () => {
  const { isManager, user } = useAuthUser();
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [positionFilter, setPositionFilter] = useState<string>('');
  const reportFilter = {
    role:
      roleFilter.length > 0
        ? {
            id: { eq: roleFilter },
          }
        : {},

    positions:
      positionFilter.length > 1
        ? {
            containsi: positionFilter,
          }
        : {},
  };

  const { users, refetch } = useNormalizedUsers(reportFilter);
  const [isCreateUser, setIsCreateUser] = useState(false);

  const onToggleForm = () => {
    setIsCreateUser(!isCreateUser);
    refetch();
  };

  return (
    <MainWrapper
      sidebar={
        <>
          {isManager && !isCreateUser && (
            <Button
              sx={{ mb: 2 }}
              fullWidth
              variant="contained"
              title="Add new user"
              size="large"
              onClick={onToggleForm}
            />
          )}
          <TimeInspector userId={isManager ? undefined : user.id} />
        </>
      }
    >
      {isCreateUser ? (
        <NewUser onToggleForm={onToggleForm} />
      ) : (
        <>
          <Typography variant="h1">My crew</Typography>
          <Stack mt={4} spacing={2}>
            <Stack direction="row" spacing={2} mb={4}>
              <CrewFilters
                roleFilter={roleFilter}
                setRoleFilter={setRoleFilter}
                positionFilter={positionFilter}
                setPositionFilter={setPositionFilter}
              />
            </Stack>
            <UsersList
              usersList={users}
              isManager={isManager}
              meId={user.id}
              refetch={refetch}
            />
          </Stack>
        </>
      )}
    </MainWrapper>
  );
};

export default CrewPage;
