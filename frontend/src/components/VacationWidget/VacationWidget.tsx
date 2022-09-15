import {
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useAuthUser } from 'hooks';
import React from 'react';

export const VacationWidget = () => {
  const { isManager } = useAuthUser();

  return (
    <Stack gap={4} maxWidth={200} mt={10}>
      {isManager && (
        <Button
          sx={{
            textTransform: 'none',
          }}
          variant="contained"
        >
          Vacation request
        </Button>
      )}
      <List disablePadding>
        <ListItem disableGutters disablePadding>
          <ListItemText
            primary={<Typography fontWeight={600}>Vacations:</Typography>}
          />
          <ListItemText
            sx={{ ml: 2, display: 'contents' }}
            primary={<Typography fontWeight={600}>1</Typography>}
          />
        </ListItem>
        <ListItem disableGutters disablePadding>
          <ListItemText
            primary={<Typography fontWeight={600}>Sick leave:</Typography>}
          />
          <ListItemText
            sx={{ ml: 2, display: 'contents' }}
            primary={<Typography fontWeight={600}>1</Typography>}
          />
        </ListItem>
      </List>
    </Stack>
  );
};
