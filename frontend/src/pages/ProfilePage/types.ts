import { FormikState } from 'formik';
import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from '@apollo/client';

import { IconsNames } from 'legos/Icon';

export interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  setEdit: (value: boolean) => void;
  edit?: boolean;
  isCanEdit: boolean;

  resetForm: (() => void) &
    ((nextState?: Partial<FormikState<InitialValuesType>> | undefined) => void);
  submitForm: (() => void) & (() => Promise<void>) & (() => Promise<any>);
}

export type InitialValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  linkedIn: string;
  dateEmployment: string;
  avatar: string;
  salaryInfo: string;
};

export type valuesType = {
  [key: string]: string;
};

export interface ProfileInfoType {
  label: string;
  fieldName: string;
  component: string;
  type: string;
  icon: IconsNames;
  items?: { label: string; value: string }[];
}

export interface ChangeAvatarProps {
  event: any;
  avatarId: string | number;
  userId: string | number;

  updateUserMutation: (
    options?:
      | MutationFunctionOptions<
          any,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<any>;
}
