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

export const SummaryStep = () => {
  const { values } = useFormikContext<FormikValues>();
  const {
    projectTitle,
    client,
    paymentMethod,
    startDate,
    endDate,
    manager,
    employees,
  } = values;

  return (
    <>
      <Typography variant="h5">Summary</Typography>
      <Stack gap={4}>
        <Typography variant="subtitle1" component="div">
          Please review the information before creation
        </Typography>
        <List>
          <ListItem sx={{ paddingLeft: 0 }}>
            <ListItemText
              primary={
                <Typography variant="subtitle1">{`Project name: ${projectTitle}`}</Typography>
              }
            />
          </ListItem>
          <ListItem sx={{ paddingLeft: 0 }}>
            <ListItemText
              primary={
                <Typography variant="subtitle1">{`Client: ${client}`}</Typography>
              }
            />
          </ListItem>
          <ListItem sx={{ paddingLeft: 0 }}>
            <ListItemText
              primary={
                <Typography variant="subtitle1">{`Project type: ${paymentMethod}`}</Typography>
              }
            />
          </ListItem>
          <ListItem sx={{ paddingLeft: 0 }}>
            <ListItemText
              primary={
                <Typography variant="subtitle1">{`Project duration: ${format(
                  startDate,
                  'dd MMM YYY'
                )} - ${format(endDate, 'dd MMM YYY')}`}</Typography>
              }
            />
          </ListItem>
          <ListItem sx={{ paddingLeft: 0 }}>
            <ListItemText
              primary={
                <Typography variant="subtitle1">{`Project manager: ${manager}`}</Typography>
              }
            />
          </ListItem>
        </List>
        {employees.length > 0 && (
          <>
            <Typography variant="h6" fontWeight={300}>
              Rate agreements
            </Typography>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      '& .MuiTableCell-root': {
                        borderBottom: '1.5px solid rgba(0, 0, 0)',
                      },
                    }}
                  >
                    <TableCell sx={{ fontWeight: 900, paddingRight: '100px' }}>
                      Employee
                    </TableCell>
                    <TableCell sx={{ fontWeight: 900 }}>Rate, $</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {values.employees.map((employee: any) => (
                    <TableRow
                      key={`${employee.name}`}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {employee.name && `${employee.name}`}
                      </TableCell>
                      <TableCell>{employee.rate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Stack>
    </>
  );
};
