import { useQuery } from '@apollo/client';

import { USERS_QUERY } from 'api';
import { Role } from 'constants/types';
import {
  Scalars,
  UsersPermissionsUserEntity,
  UsersPermissionsUserEntityResponseCollection,
} from 'types/GraphqlTypes';
import { Maybe } from 'yup/lib/types';

type Choices = {
  label: string;
  value: Maybe<Scalars['ID']>;
};

export const useNormalizedUsers = () => {
  const { data, loading, refetch } = useQuery<{
    usersPermissionsUsers: UsersPermissionsUserEntityResponseCollection;
  }>(USERS_QUERY);

  const users = data?.usersPermissionsUsers.data;
  const managers: UsersPermissionsUserEntity[] = [];
  const employees: UsersPermissionsUserEntity[] = [];
  const usersChoices: Choices[] = [];
  const managersChoices: Choices[] = [];
  const employeesChoices: Choices[] = [];

  users?.forEach(({ id, attributes }) => {
    usersChoices.push({
      label: `${attributes?.firstName} ${attributes?.lastName}`,
      value: id,
    });

    if (attributes?.role?.data?.attributes?.type === Role.Manager) {
      managers.push({ id, attributes });
      managersChoices.push({
        label: `${attributes?.firstName} ${attributes?.lastName}`,
        value: id,
      });
    }

    if (attributes?.role?.data?.attributes?.type === Role.Employee) {
      employees.push({ id, attributes });
      employeesChoices.push({
        label: `${attributes?.firstName} ${attributes?.lastName}`,
        value: id,
      });
    }
  });

  return {
    users,
    managers,
    employees,
    usersChoices,
    managersChoices,
    employeesChoices,
    loading,
    refetch,
  };
};
