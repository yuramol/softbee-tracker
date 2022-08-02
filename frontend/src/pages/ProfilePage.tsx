import React, { useState } from 'react';
import { useFormik } from 'formik';

import {
  Avatar,
  Box,
  Grid,
  IconButton,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import {
  CalendarMonth,
  Email,
  Link,
  Person,
  Phone,
  Work,
} from '@mui/icons-material';

import { MainWrapper } from 'components';
import { ModalSelect } from 'legos';

type inintialValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  link: string;
  dateOfEmployment: string;
};

type values = {
  [key: string]: string;
};

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
    label: 'Email',
    fieldName: 'email',
    component: 'input',
    type: 'email',
  },
  {
    label: 'Position',
    fieldName: 'position',
    component: 'select',
    items: [{ label: 'dev' }, { label: 'manager' }],
    type: 'text',
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
];

const initialValues: inintialValuesType = {
  firstName: 'stas',
  lastName: 'babuch',
  email: 'stasbs@mail.com',
  phone: '278347394857348975',
  position: 'dev',
  link: 'google.con',
  dateOfEmployment: 'string',
};

const ProfilePage = () => {
  const [edit, setEdit] = useState(false);

  const formik = useFormik<inintialValuesType>({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(
        '%c jordan values',
        'color: lime; font-weight: bold; font-size: 16px; text-transform: uppercase',
        values
      );
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
      case 'firstName' || 'lastName':
        return <Person />;
      default:
        return '';
    }
  };

  return (
    <MainWrapper>
      <h1>Profile</h1>
      <Grid container spacing={3}>
        <Grid container item xs={12} justifyContent="space-between">
          <Box ml={1}>
            <Typography
              fontWeight={700}
              fontSize={32}
            >{`${formik.values.firstName} ${formik.values.firstName}`}</Typography>
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
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              sx={{ width: '250px', height: '250px' }}
              alt="User avatar"
              src="https://i.pravatar.cc/300"
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <Typography>Upload new photo</Typography>
              <input hidden accept="image/*" type="file" />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={6}>
          {profileInfo.map(({ fieldName, component, items, label, type }) => {
            if (component === 'select') {
              return (
                <Box display="flex" alignItems="center" my={2}>
                  {iconRender(fieldName)}
                  <Box width={8} />
                  {edit ? (
                    <Box width="100%">
                      {items?.length && (
                        <ModalSelect items={items} label={label} />
                      )}
                    </Box>
                  ) : (
                    <Box ml={1}>
                      <Typography>{label}</Typography>
                      <Typography>
                        {(formik.values as values)[fieldName]}
                      </Typography>
                    </Box>
                  )}
                </Box>
              );
            }
            if (component === 'input') {
              return (
                <Box display="flex" alignItems="center" my={2}>
                  {iconRender(fieldName)}
                  {edit ? (
                    <Box ml={1} width="100%">
                      <TextField
                        fullWidth
                        value={(formik.values as values)[fieldName]}
                        label={label}
                        type={type}
                        onChange={(e) =>
                          formik.setFieldValue(fieldName, e.target.value)
                        }
                      />
                    </Box>
                  ) : (
                    <Box ml={1}>
                      <Typography color="common.lightGrey">{label}</Typography>
                      <Typography>
                        {(formik.values as values)[fieldName]}
                      </Typography>
                    </Box>
                  )}
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
