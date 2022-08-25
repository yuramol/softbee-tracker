import { Enum_Project_Type } from 'types/GraphqlTypes';

export enum CreateProjectFields {
  Name = 'name',
  Client = 'client',
  Type = 'type',
  Start = 'start',
  End = 'end',
  Status = 'status',
  Salary = 'salary',
  Managers = 'managers',
  Users = 'users',
}

export type ProjectProps = {
  setIsCreateProject: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CreateProjectStep = {
  name: string;
  fields: CreateProjectFields[];
};

export type ProjectType = {
  label: string;
  value: Enum_Project_Type;
};

export type Salary = {
  users: string;
  rate: number;
};
