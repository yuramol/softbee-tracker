import React, { useState } from 'react';
import { Button } from 'legos';
import { useAuthUser, useNormalizedUsers } from 'hooks';
import { Stack, Typography } from '@mui/material';
import { MainWrapper, UsersList, NewUser, TimeInspector } from 'components';

const CrewPage = () => {
  const { isManager, user } = useAuthUser();
  const { users } = useNormalizedUsers();
  const [isCreateUser, setIsCreateUser] = useState(false);

  const onToggleForm = () => {
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
            <UsersList usersList={users} isManager={isManager} meId={user.id} />
          </Stack>
        </>
      )}
    </MainWrapper>
  );
};

export default CrewPage;
