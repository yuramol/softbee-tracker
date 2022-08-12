import { TextFieldProps } from '@mui/material/TextField';

export type InputProps = TextFieldProps & {
  disableUnderline?: boolean;
  onChange: (value: string) => void;
};
