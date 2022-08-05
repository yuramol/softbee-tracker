import * as yup from 'yup';

export const profileInfo = [
  {
    label: 'First name',
    fieldName: 'firstName',
    component: 'input',
    type: 'text',
  },
  {
    label: 'Last name',
    fieldName: 'lastName',
    component: 'input',
    type: 'text',
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
  },
  {
    label: 'Email',
    fieldName: 'email',
    component: 'input',
    type: 'email',
  },
  {
    label: 'linkedIn',
    fieldName: 'linkedIn',
    component: 'input',
    type: 'text',
  },
  {
    label: 'Phone',
    fieldName: 'phone',
    component: 'input',
    type: 'text',
  },
  {
    label: 'Date Of Employment',
    fieldName: 'dateEmployment',
    component: 'input',
    type: 'text',
  },
  {
    label: 'Salary Info',
    fieldName: 'salaryInfo',
    component: 'input',
    type: 'text',
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
