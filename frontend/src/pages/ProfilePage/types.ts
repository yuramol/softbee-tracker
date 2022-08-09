import { IconsNames } from 'legos/Icon';

export type initialValuesType = {
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

export type ProfileInfoType = {
  label: string;
  fieldName: string;
  component: string;
  type: string;
  icon: IconsNames;
  items?: { id: string; attributes: { name: string } }[];
};
