import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Header, ManualEntryDialog } from '../components';
import AddIcon from '@mui/icons-material/Add';
import { gql } from '@apollo/client';
const CREATE_TRACKER = gql`
  mutation CreateTracker(
    $desc: Text!
    $date: Date!
    $project: ID!
    $duration: Time!
  ) {
    createTracker(
      data: {
        description: $desc
        date: $date
        project: $project
        duration: $duration
      }
    ) {
      data {
        id
        attributes {
          description
          date
          project {
            data {
              id
              attributes {
                name
                note
              }
            }
          }
          duration
        }
      }
    }
  }
`;
export const HomePage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Header />
      <p>Home page</p>
      <Button
        variant="contained"
        color="success"
        onClick={handleOpen}
        sx={{
          minWidth: '40px',
          minHeight: '40px',
          maxWidth: '40px',
          maxHeight: '40px',
        }}
      >
        <AddIcon />
      </Button>
      <ManualEntryDialog open={open} onClose={handleClose} />
    </div>
  );
};
