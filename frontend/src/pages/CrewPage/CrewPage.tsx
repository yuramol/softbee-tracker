import React, { useState } from 'react';
import { Button } from 'legos';
import { useAuthUser, useNormalizedUsers } from 'hooks';
import { Stack, Typography } from '@mui/material';
import { MainWrapper, UsersList, NewUser, TimeInspector } from 'components';
import { PageProps } from 'pages/types';
import { CrewFilters } from './CrewFilters';

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

    position:
      positionFilter.length > 1
        ? {
            eq: positionFilter,
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
          <TimeInspector />
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
            <UsersList usersList={users} isManager={isManager} meId={user.id} />
          </Stack>
        </>
      )}
    </MainWrapper>
  );
};

export default CrewPage;
