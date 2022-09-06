import React, { useState } from 'react';
import { Button } from 'legos';
import { useAuthUser, useUsersPermissionsUsers } from 'hooks';
import { Stack, Typography } from '@mui/material';
import { MainWrapper, SideBars, UsersList, NewUser } from 'components';

const CrewPage = () => {
  const { users } = useUsersPermissionsUsers();
  const [isCreateUser, setIsCreateUser] = useState(false);
  const { isManager } = useAuthUser();
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
              onClick={() => setIsCreateUser(!isCreateUser)}
            />
          )}

          <SideBars />
        </>
      }
    >
      {isCreateUser ? (
        <NewUser setIsCreateUser={setIsCreateUser} />
      ) : (
        <>
          <Typography variant="h1">My crew</Typography>
          <Stack mt={4} spacing={2}>
            <UsersList usersList={users} />
          </Stack>
        </>
      )}
    </MainWrapper>
  );
};

export default CrewPage;
