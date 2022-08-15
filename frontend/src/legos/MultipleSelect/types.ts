import { ReactElement } from 'react';

import { SelectProps } from '@mui/material';

export type ItemType = { label: string; value: string };

export type SelectPropsType = SelectProps & {
  items: ItemType[];
  label: string;
  value?: string[];
  onChange: (value: unknown) => void;
  variant?: 'standard' | 'outlined' | 'filled' | undefined;
};
