import React, { forwardRef, ReactNode } from 'react';
import { Box } from '@mui/material';

import { theme } from 'theme';

type TimePickerBlockProps = {
  children: ReactNode;
};

export const TimePickerDialog = forwardRef<
  HTMLDivElement,
  TimePickerBlockProps
>(({ children }, ref) => (
  <Box
    ref={ref}
    tabIndex={1}
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
));

TimePickerDialog.displayName = 'TimePickerDialog';

export default TimePickerDialog;
