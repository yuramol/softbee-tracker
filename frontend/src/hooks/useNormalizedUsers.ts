import { useQuery } from '@apollo/client';

import { USERS_QUERY } from 'api';
import { Role } from 'constants/types';
import {
  UsersPermissionsUserEntity,
  UsersPermissionsUserEntityResponseCollection,
} from 'types/GraphqlTypes';

const getUsersByRoleType = (
  users: UsersPermissionsUserEntity[] | undefined,
  roleType: Role
) =>
  users?.filter(
    ({ attributes }) => attributes?.role?.data?.attributes?.type === roleType
  );

const getUsersForSelect = (users: UsersPermissionsUserEntity[] | undefined) =>
  users?.map(({ id, attributes }) => ({
    label: `${attributes?.firstName} ${attributes?.lastName}`,
    value: id,
  }));

export const useNormalizedUsers = () => {
  const { data, loading, refetch } = useQuery<{
    usersPermissionsUsers: UsersPermissionsUserEntityResponseCollection;
  }>(USERS_QUERY);

  const users = data?.usersPermissionsUsers.data;
  const managers = getUsersByRoleType(users, Role.Manager);
  const employees = getUsersByRoleType(users, Role.Employee);
  const usersChoices = getUsersForSelect(users);
  const managersChoices = getUsersForSelect(managers);
  const employeesChoices = getUsersForSelect(employees);

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
