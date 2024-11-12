import React, { useState } from 'react';
import { Close } from '@mui/icons-material';
import { Drawer, IconButton, Stack, Typography } from '@mui/material';

import { Button } from 'legos';
import { PageProps } from 'pages/types';
import { CrewFilters } from './CrewFilters';
import { useAuthUser, useNormalizedUsers } from 'hooks';
import { MainWrapper, UsersList, NewUser, TimeInspector } from 'components';

const CrewPage: React.FC<PageProps> = () => {
  const { isManager, user } = useAuthUser();
  const [openDrawer, setOpenDrawer] = useState(false);

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
    setOpenDrawer(false);
    setIsCreateUser(!isCreateUser);
    refetch();
  };

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

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
      <Button
        sx={{ mb: 2, display: { lg: 'none' } }}
        variant="contained"
        title="Open sidebar"
        size="large"
        onClick={toggleDrawer}
      />
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
      <Drawer open={openDrawer} onClose={toggleDrawer} sx={{ m: 4 }}>
        <Stack position="relative" flexDirection="column" p={4} pt={8}>
          <IconButton
            onClick={toggleDrawer}
            sx={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
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
        </Stack>
      </Drawer>
    </MainWrapper>
  );
};

export default CrewPage;
