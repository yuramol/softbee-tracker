import React, { useState } from 'react';
import { Button } from 'legos';
import { useAuthUser, useNormalizedUsers } from 'hooks';
import { Stack, Typography } from '@mui/material';
import { MainWrapper, UsersList, NewUser, TimeInspector } from 'components';
import { PageProps } from 'pages/types';

const CrewPage: React.FC<PageProps> = () => {
  const { isManager, user } = useAuthUser();
  const { users, refetch } = useNormalizedUsers();
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
            <UsersList usersList={users} isManager={isManager} meId={user.id} />
          </Stack>
        </>
      )}
    </MainWrapper>
  );
};

export default CrewPage;
