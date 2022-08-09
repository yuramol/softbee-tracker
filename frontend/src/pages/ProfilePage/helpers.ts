import * as yup from 'yup';
import { ProfileInfoType } from './types';

export const profileInfo: ProfileInfoType[] = [
  {
    label: 'First name',
    fieldName: 'firstName',
    component: 'input',
    type: 'text',
    icon: 'person',
  },
  {
    label: 'Last name',
    fieldName: 'lastName',
    component: 'input',
    type: 'text',
    icon: 'person',
  },
  {
    label: 'Position',
    fieldName: 'position',
    component: 'select',
    items: [
      { label: 'developer' },
      { label: 'designer' },
      { label: 'cdo' },
      { label: 'cto' },
    ],
    type: 'text',
    icon: 'work',
  },
  {
    label: 'Email',
    fieldName: 'email',
    component: 'input',
    type: 'email',
    icon: 'email',
  },
  {
    label: 'linkedIn',
    fieldName: 'linkedIn',
    component: 'input',
    type: 'text',
    icon: 'link',
  },
  {
    label: 'Phone',
    fieldName: 'phone',
    component: 'input',
    type: 'text',
    icon: 'phone',
  },
  {
    label: 'Date Of Employment',
    fieldName: 'dateEmployment',
    component: 'input',
    type: 'text',
    icon: 'calendarMonth',
  },
  {
    label: 'Salary Info',
    fieldName: 'salaryInfo',
    component: 'input',
    type: 'text',
    icon: 'money',
  },
];

export const validationSchema = yup.object({
  firstName: yup.string().required('Should not be empty'),
  lastName: yup.string().required('Should not be empty'),
  email: yup
    .string()
    .email('Please enter a valid e-mail address')
    .required('Should not be empty'),
  linkedIn: yup.string().url(),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'Phone must be at least 10 characters'),
  dateEmployment: yup.date(),
});
