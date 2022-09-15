import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from '@apollo/client';
import {
  Enum_Userspermissionsuser_Position,
  Maybe,
  Scalars,
} from 'types/GraphqlTypes';

export enum ProfileFields {
  UserName = 'username',
  FirstName = 'firstName',
  LastName = 'lastName',
  Position = 'position',
  Email = 'email',
  LinkedIn = 'linkedIn',
  UpWork = 'upWork',
  Phone = 'phone',
  DateEmployment = 'dateEmployment',
  SalaryInfo = 'salaryInfo',
}

export type ProfileInitialValues = {
  [ProfileFields.UserName]: string;
  [ProfileFields.FirstName]: string;
  [ProfileFields.LastName]: string;
  [ProfileFields.Position]: Enum_Userspermissionsuser_Position;
  [ProfileFields.Email]: string;
  [ProfileFields.LinkedIn]: string;
  // [ProfileFields.UpWork]: string;
  [ProfileFields.Phone]: string;
  [ProfileFields.DateEmployment]: Date;
  [ProfileFields.SalaryInfo]: string;
};

export interface ChangeAvatarProps {
  event: React.ChangeEvent<Element>;
  avatarId?: Maybe<Scalars['ID']>;
  userId: string | number;
  updateUserMutation: (
    options?:
      | MutationFunctionOptions<
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          any,
          OperationVariables,
          DefaultContext,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ApolloCache<any>
        >
      | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<any>;
}
