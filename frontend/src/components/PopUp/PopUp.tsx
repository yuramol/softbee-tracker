// import React from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// export const PopUp = () => {
//   return (
//     <Formik
//       initialValues={{
//         firstName: '',
//         lastName: '',
//         email: '',
//         colors: '',
//         message: 'cc',
//       }}
//       validationSchema={Yup.object({
//         firstName: Yup.string()
//           .max(15, 'Must be 15 characters or less')
//           .required('Required'),
//         lastName: Yup.string()
//           .max(20, 'Must be 20 characters or less')
//           .required('Required'),
//         email: Yup.string().email('Invalid email address').required('Required'),
//       })}
//       onSubmit={(values, { setSubmitting }) => {
//         console.log(values);
//       }}
//     >
//       <Form>
//         <label htmlFor='firstName'>First Name</label>
//         <Field name='firstName' type='text' />
//         <ErrorMessage name='firstName' />

//         <label htmlFor='lastName'>Last Name</label>
//         <Field name='lastName' type='text' />
//         <ErrorMessage name='lastName' />

//         <label htmlFor='email'>Email Address</label>
//         <Field name='email' type='email' />
//         <ErrorMessage name='email' />

//         <Field name='colors' as='select' className='my-select'>
//           <option value='red'>Red</option>
//           <option value='green'>Green</option>
//           <option value='blue'>Blue</option>
//         </Field>

//         <Field name='message' as='textarea' className='form-textarea' />

//         <button type='submit'>Submit</button>
//       </Form>
//     </Formik>
//   );
// };

import React from 'react';
import { Formik, Field, Form, useFormik } from 'formik';
import * as Yup from 'yup';

export const PopUp = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor='firstName'>First Name</label>
      <input
        id='firstName'
        type='text'
        {...formik.getFieldProps('firstName')}
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div>{formik.errors.firstName}</div>
      ) : null}

      <label htmlFor='lastName'>Last Name</label>
      <input id='lastName' type='text' {...formik.getFieldProps('lastName')} />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div>{formik.errors.lastName}</div>
      ) : null}

      <label htmlFor='email'>Email Address</label>
      <input id='email' type='email' {...formik.getFieldProps('email')} />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      <label htmlFor='password'>Password</label>
      <input
        id='password'
        type='password'
        {...formik.getFieldProps('password')}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}

      <button type='submit'>Submit</button>
    </form>
  );
};
