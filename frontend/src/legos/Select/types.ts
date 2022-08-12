import { ReactElement } from 'react';

import { SelectProps } from '@mui/material';
import { ProjectEntity } from 'types/GraphqlTypes';

export type ItemType = {
  label: string;
  value: string;
  id?: string;
  attributes?: any;
};

export type SelectPropsType = SelectProps & {
  items: ProjectEntity[] | ItemType[] | undefined;
  label: string;
  // disabled?: boolean;
  // value?: string;
  errorText?: string;
  onChange: (value: unknown) => void;
  IconComponent?: () => ReactElement | null;
};
