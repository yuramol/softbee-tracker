import React, { useState } from 'react';
import { useFormik } from 'formik';

import { Box, Grid, TextField, Typography, Button } from '@mui/material';
import {
  CalendarMonth,
  Email,
  Link,
  Person,
  Phone,
  Work,
  Money,
} from '@mui/icons-material';

import { MainWrapper, AvatarUpload } from 'components';
import { ModalSelect } from 'legos';

type inintialValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  link: string;
  dateOfEmployment: string;
  avatar: string;
  rate: string;
};

type values = {
  [key: string]: string;
};

//TODO add information about user

const profileInfo = [
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
      { label: 'Dev', value: 'Dev' },
      { label: 'manager', value: 'manager' },
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
    label: 'Link',
    fieldName: 'link',
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
    fieldName: 'dateOfEmployment',
    component: 'input',
    type: 'text',
  },
  {
    label: 'Rate',
    fieldName: 'rate',
    component: 'input',
    type: 'text',
  },
];

const initialValues: inintialValuesType = {
  firstName: 'Stas',
  lastName: 'Babuch',
  email: 'stasbs@mail.com',
  phone: '+380636312452',
  position: 'Dev',
  link: 'google.con',
  dateOfEmployment: 'string',
  avatar: 'https://i.pravatar.cc/300',
  rate: '3$',
};

const ProfilePage = () => {
  const [edit, setEdit] = useState(false);

  const formik = useFormik<inintialValuesType>({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      setEdit(false);
    },
  });

  const iconRender = (fieldName: string) => {
    switch (fieldName) {
      case 'email':
        return <Email />;
      case 'link':
        return <Link />;
      case 'phone':
        return <Phone />;
      case 'dateOfEmployment':
        return <CalendarMonth />;
      case 'position':
        return <Work />;
      case 'lastName':
        return <Person />;
      case 'firstName':
        return <Person />;
      case 'rate':
        return <Money />;
      default:
        return '';
    }
  };

  return (
    <MainWrapper>
      <Grid container spacing={3}>
        <Grid container item xs={12} justifyContent="space-between">
          <Box ml={3}>
            <Typography
              fontWeight={700}
              fontSize={32}
            >{`${formik.values.firstName} ${formik.values.lastName}`}</Typography>
          </Box>
          {edit ? (
            <Button variant="contained" onClick={formik.submitForm}>
              Save
            </Button>
          ) : (
            <Button variant="outlined" onClick={() => setEdit(true)}>
              Edit
            </Button>
          )}
        </Grid>
        <Grid container item xs={3} justifyContent="center">
          <AvatarUpload
            name={`${formik.values.firstName} ${formik.values.lastName}`}
            avatar={formik.values.avatar}
          />
        </Grid>
        <Grid item xs={6}>
          {profileInfo.map(({ fieldName, component, items, label, type }) => {
            if (component === 'select') {
              return (
                <Box display="flex" alignItems="center" my={1}>
                  {iconRender(fieldName)}

                  <Box width="100%" ml={1}>
                    {items?.length && (
                      <ModalSelect
                        variant="standard"
                        value={(formik.values as values)[fieldName]}
                        onChange={(value) =>
                          formik.setFieldValue(fieldName, value)
                        }
                        disabled={!edit}
                        items={items}
                        label={label}
                        disableUnderline={!edit}
                        IconComponent={() => null}
                      />
                    )}
                  </Box>
                </Box>
              );
            }
            if (component === 'input') {
              return (
                <Box display="flex" alignItems="center" my={2}>
                  {iconRender(fieldName)}
                  <Box ml={1} width="100%">
                    <TextField
                      InputProps={{
                        disableUnderline: !edit,
                      }}
                      variant="standard"
                      disabled={!edit}
                      fullWidth
                      value={(formik.values as values)[fieldName]}
                      label={label}
                      type={type}
                      onChange={(e) =>
                        formik.setFieldValue(fieldName, e.target.value)
                      }
                    />
                  </Box>
                </Box>
              );
            }
          })}
        </Grid>
      </Grid>
    </MainWrapper>
  );
};

export default ProfilePage;
