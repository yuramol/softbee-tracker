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
    id="dialog"
    display="flex"
    width="50%"
    alignItems={type === 'hours' ? 'flex-end' : 'flex-start'}
    flexDirection="column"
    margin="auto 12px"
    onWheel={onWheel}
  >
    <ArrowUp onClick={onUpClick} size={36} id="dialog" />
    {formatNumber(number)}
    <ArrowDown onClick={onDownClick} size={36} id="dialog" />
  </Box>
);
