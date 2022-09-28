import React, { useState } from 'react';
import { Button } from 'legos';
import { useAuthUser, useNormalizedUsers } from 'hooks';
import { Stack, Typography } from '@mui/material';
import { MainWrapper, SideBars, UsersList, NewUser } from 'components';

const CrewPage = () => {
  const { isManager } = useAuthUser();
  const { users } = useNormalizedUsers();
  const [isCreateUser, setIsCreateUser] = useState(false);

  const onCreate = () => {
    setIsCreateUser(!isCreateUser);
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
              onClick={onCreate}
            />
          )}

          <SideBars />
        </>
      }
    >
      {isCreateUser ? (
        <NewUser onCreate={onCreate} />
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
