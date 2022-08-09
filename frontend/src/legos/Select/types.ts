import { ReactElement } from 'react';

import { SelectProps } from '@mui/material';

export type ItemType = { label: string };

export type SelectPropsType = SelectProps & {
  items: ItemType[];
  label: string;
  disabled?: boolean;
  value?: string;
  disableUnderline?: boolean;
  onChange: (value: unknown) => void;
  variant?: 'standard' | 'outlined' | 'filled' | undefined;
  IconComponent?: () => ReactElement | null;
};
