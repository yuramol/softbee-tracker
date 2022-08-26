import React, { useState } from 'react';
import { Button } from 'legos';
import { useAuth } from 'AuthProvider';
import { useUsersPermissionsUsers } from 'hooks';
import { Stack, Typography } from '@mui/material';
import { MainWrapper, SideBars, UsersList, NewUser } from 'components';
import { Role } from 'constants/types';

const CrewPage = () => {
  const { users } = useUsersPermissionsUsers();
  const [isCreateUser, setIsCreateUser] = useState(false);
  const { user } = useAuth();
  const isManager = user.role.type === Role.Manager;

  return (
    <MainWrapper
      sidebar={
        <>
          {isManager ? (
            <Button
              sx={{ mb: 2 }}
              fullWidth
              variant="contained"
              title="Add new user"
              size="large"
              onClick={() => setIsCreateUser(!isCreateUser)}
            />
          ) : null}

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
