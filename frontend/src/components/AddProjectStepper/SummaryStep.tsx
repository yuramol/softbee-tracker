import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Stack,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { FormikValues, useFormikContext } from 'formik';
import { format } from 'date-fns';

import { useNormalizedUsers } from 'hooks';
import { projectTypes } from './NewProjectStep';
import { CreateProjectFields, Salary } from './types';

export const SummaryStep = () => {
  const { values } = useFormikContext<FormikValues>();
  const { managersChoices, employeesChoices } = useNormalizedUsers();

  return (
    <>
      <Typography variant="h5">Summary</Typography>
      <Stack gap={4}>
        <Typography fontSize={18}>
          Please review the information before creation
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemText sx={{ display: 'contents' }}>
              <Typography component="span" variant="subtitle2">
                Project name:
              </Typography>
            </ListItemText>
            <ListItemText sx={{ ml: 2 }}>
              {values[CreateProjectFields.Name]}
            </ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <ListItemText sx={{ display: 'contents' }}>
              <Typography component="span" variant="subtitle2">
                Client:
              </Typography>
            </ListItemText>
            <ListItemText sx={{ ml: 2 }}>
              {values[CreateProjectFields.Client]}
            </ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <ListItemText sx={{ display: 'contents' }}>
              <Typography component="span" variant="subtitle2">
                Project type:
              </Typography>
            </ListItemText>
            <ListItemText sx={{ ml: 2 }}>
              {
                projectTypes.find(
                  ({ value }) => values[CreateProjectFields.Type] === value
                )?.label
              }
            </ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <ListItemText sx={{ display: 'contents' }}>
              <Typography component="span" variant="subtitle2">
                Project duration:
              </Typography>
            </ListItemText>
            <ListItemText sx={{ ml: 2 }}>{`${format(
              values[CreateProjectFields.Start],
              'dd MMM YYY'
            )} - ${format(
              values[CreateProjectFields.End],
              'dd MMM YYY'
            )}`}</ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <ListItemText sx={{ display: 'contents' }}>
              <Typography component="span" variant="subtitle2">
                Project manager:
              </Typography>
            </ListItemText>
            <ListItemText sx={{ ml: 2 }}>
              {
                managersChoices?.find(
                  ({ value }) =>
                    values[CreateProjectFields.Managers][0] === value
                )?.label
              }
            </ListItemText>
          </ListItem>
        </List>
        {values[CreateProjectFields.Salary].length > 0 && (
          <>
            <Typography fontSize={18}>Rate agreements</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell>Rate, $</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {values[CreateProjectFields.Salary].map(
                    ({ users, rate }: Salary) => (
                      <TableRow key={users}>
                        <TableCell component="th" scope="row">
                          {
                            employeesChoices?.find(
                              ({ value }) => users === value
                            )?.label
                          }
                        </TableCell>
                        <TableCell>{rate}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Stack>
    </>
  );
};
