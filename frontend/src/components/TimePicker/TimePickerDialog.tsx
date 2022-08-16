import { Box } from '@mui/material';
import React, { ReactNode, RefObject } from 'react';

import { theme } from 'theme';

// const TimePickerDialog = styled.div`
//   background: white;
//   box-shadow: 0 1px 3px #d3d3d380, 0 1px 3px #d3d3d380;
// `;

type TimePickerBlockProps = {
  ref: RefObject<HTMLDivElement>;
  onBlur: () => void;
  children: ReactNode;
};

export const TimePickerDialog = ({
  ref,
  onBlur,
  children,
}: TimePickerBlockProps) => (
  <Box
    ref={ref}
    tabIndex={1}
    onBlur={onBlur}
    display="flex"
    position="absolute"
    top="66px"
    width={200}
    alignItems="center"
    fontSize={22}
    justifyContent="center"
    zIndex={999}
    color={theme.palette.primary.main}
    borderRadius="5px"
    bgcolor={theme.palette.common.white}
    border={`1px solid ${theme.palette.primary.main}`}
    sx={{ userSelect: 'none' }}
  >
    {children}
  </Box>
);

export default TimePickerDialog;
