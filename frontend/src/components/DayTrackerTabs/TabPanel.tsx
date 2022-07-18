import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { gql, useQuery } from '@apollo/client';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC } from 'react';

type TypeTabPanel = {
  dataTabs: {
    value: number;
    project: {
      title: string;
      duraction: string;
      description: string;
    }[];
  }[];
  index: number;
  value: number;
};

export const TabPanel = (props: TypeTabPanel) => {
  const { dataTabs, index, value } = props;
  const currentData = dataTabs.find((el) => el.value === index);

  if (currentData) {
    return (
      <Box sx={{ display: index !== value ? 'none' : 'block' }}>
        {currentData.value === value &&
          currentData.project.map(({ duraction, title, description }, i) => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                py: '15px',
                borderTop: '1px solid gray',
              }}
              key={i}
            >
              <Typography variant="h6">
                {title} - {description}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ mr: '20px' }} variant="h6">
                  {duraction}
                </Typography>
                <Button variant="outlined">
                  <AccessTimeIcon sx={{ mr: '5px' }} fontSize="small" /> Start
                </Button>
                <Button sx={{ ml: '5px' }} variant="outlined">
                  Edit
                </Button>
              </Box>
            </Box>
          ))}
        <Typography
          variant="h6"
          sx={{ py: '15px', borderTop: '1px solid gray' }}
        >
          Total: 08:00
        </Typography>
      </Box>
    );
  }
  return (
    <Typography variant="h6" sx={{ py: '15px' }} hidden={value !== index}>
      not tracked for this day
    </Typography>
  );
};
