import { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { IconsNames } from '../Icon/types';

export type ButtonProps = MuiButtonProps & {
  title?: string;
  loading?: boolean;
  icon?: IconsNames;
  fontSize?: string | number;
  iconSize?: 'inherit' | 'large' | 'medium' | 'small';
};
