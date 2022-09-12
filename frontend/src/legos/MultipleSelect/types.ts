import { SelectProps } from '@mui/material';
import { Maybe, Scalars } from 'types/GraphqlTypes';

export type ItemType = {
  label?: string;
  value?: Maybe<Scalars['String']>;
};

export type MultipleSelectProps = SelectProps & {
  label: string;
  setValue?: React.Dispatch<React.SetStateAction<string[]>> | undefined;
  items?: ItemType[];
  helperText?: boolean | string;
};
