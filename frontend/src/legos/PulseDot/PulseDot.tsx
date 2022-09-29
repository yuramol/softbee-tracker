import React from 'react';
import { Box } from '@mui/material';

import './PulseDot.style.css';

const styleDot = {
  transform: 'scale(1)',
  animation: 'pulse 2s infinite',
  background: '#ff0000',
  borderRadius: '50%',
};

type PulseDotType = {
  top?: string | number;
  right?: string | number;
  left?: string | number;
  bottom?: string | number;
  size?: string | number;
};

export const PulseDot = ({ top, right, left, bottom, size }: PulseDotType) => {
  return (
    <Box
      position="absolute"
      left={left || 'inherit'}
      bottom={bottom || 'inherit'}
      top={top || 2}
      right={right || 2}
    >
      <div style={{ ...styleDot, width: size || 10, height: size || 10 }} />
    </Box>
  );
};
