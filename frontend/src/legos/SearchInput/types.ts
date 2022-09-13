import { TextFieldProps } from '@mui/material/TextField';

export type SearchInputProps = TextFieldProps & {
  onChange: (value: string) => void;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  delay?: number;
};
