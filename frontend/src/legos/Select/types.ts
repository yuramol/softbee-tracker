import { ReactElement } from 'react';

export type ItemType = { label: string };

export type SelectProps = {
  items: ItemType[];
  label: string;
  disabled?: boolean;
  value?: string;
  disableUnderline?: boolean;
  onChange: (value: string) => void;
  variant?: 'standard' | 'outlined' | 'filled' | undefined;
  IconComponent?: () => ReactElement<any, any> | null;
  colorDisabledValue?: string;
};
