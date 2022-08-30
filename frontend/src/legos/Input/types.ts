import { TextFieldProps } from '@mui/material/TextField';

export type InputProps = TextFieldProps & {
  onChange: (value: string) => void;
  label?: string;
  size?: 'small' | 'medium' | 'large';
};
