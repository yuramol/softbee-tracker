import React from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useAuthUser } from 'hooks';
import { Icon } from 'legos';

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
            primary={
              <Stack direction="row">
                <Icon icon="houseboat" />
                <Typography ml={0.5} fontWeight={600}>
                  Vacations:
                </Typography>
              </Stack>
            }
          />
          <ListItemText
            sx={{ ml: 2, display: 'contents' }}
            primary={<Typography fontWeight={600}>0 / 30</Typography>}
          />
        </ListItem>
        <ListItem disableGutters disablePadding>
          <ListItemText
            primary={
              <Stack direction="row">
                <Icon icon="medication" />
                <Typography ml={0.5} fontWeight={600}>
                  Sick leave:
                </Typography>
              </Stack>
            }
          />
          <ListItemText
            sx={{ ml: 2, display: 'contents' }}
            primary={
              <Typography sx={{ verticalAlign: 'center' }} fontWeight={600}>
                0 / 5
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Stack>
  );
};
