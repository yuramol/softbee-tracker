import React, { WheelEvent } from 'react';
import { Box } from '@mui/material';

import ArrowDown from './ArrowDown';
import ArrowUp from './ArrowUp';
import { formatNumber } from './utils';

type TimePickerBlockProps = {
  number: string;
  type?: string;
  onWheel: (e: WheelEvent) => void;
  onDownClick: () => void;
  onUpClick: () => void;
};

export const TimePickerBlock = ({
  number,
  type,
  onWheel,
  onDownClick,
  onUpClick,
}: TimePickerBlockProps) => (
  <Box
    display="flex"
    width="50%"
    alignItems="center"
    flexDirection="column"
    margin="auto 12px"
    onWheel={onWheel}
  >
    <ArrowUp onClick={onUpClick} size={36} />
    {formatNumber(number)}
    <ArrowDown onClick={onDownClick} size={36} />
  </Box>
);
