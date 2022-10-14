import React, { useEffect, useState } from 'react';
import { Button } from 'legos';
import { useAuthUser, useNormalizedUsers, usePageTitle } from 'hooks';
import { Stack, Typography } from '@mui/material';
import { MainWrapper, SideBars, UsersList, NewUser } from 'components';
import { PageProps } from 'pages/types';

const CrewPage: React.FC<PageProps> = ({ title }) => {
  const { setTitle } = usePageTitle();

  const { isManager } = useAuthUser();
  const { users, refetch } = useNormalizedUsers();
  const [isCreateUser, setIsCreateUser] = useState(false);

  const onToggleForm = () => {
    setIsCreateUser(!isCreateUser);
    refetch();
  };

  useEffect(() => {
    setTitle(title as string);
  }, []);
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

          <SideBars />
        </>
      }
    >
      {isCreateUser ? (
        <NewUser onToggleForm={onToggleForm} />
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
