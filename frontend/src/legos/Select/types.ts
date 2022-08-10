import { ReactElement } from 'react';

import { SelectProps } from '@mui/material';
import { ProjectEntity } from 'types/GraphqlTypes';

export type ItemType = { label: string };

export type SelectPropsType = SelectProps & {
  items: ProjectEntity[] | undefined;
  label: string;
  // disabled?: boolean;
  // value?: string;
  errorText?: string;
  onChange: (value: unknown) => void;
  IconComponent?: () => ReactElement | null;
};
