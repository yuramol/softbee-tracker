import * as yup from 'yup';
import { ProfileFields } from './types';

export const validationSchema = yup.object({
  [ProfileFields.FirstName]: yup.string().required('Should not be empty'),
  [ProfileFields.LastName]: yup.string().required('Should not be empty'),
  [ProfileFields.Email]: yup
    .string()
    .email('Please enter a valid e-mail address')
    .required('Should not be empty'),
  [ProfileFields.LinkedIn]: yup.string().url(),
  [ProfileFields.UpWork]: yup.string().url(),
  [ProfileFields.Phone]: yup
    .string()
    .required('Should not be empty')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'Phone must be at least 10 characters'),
  [ProfileFields.SalaryInfo]: yup
    .number()
    .typeError('Must be a number')
    .required('Should not be empty'),
});
