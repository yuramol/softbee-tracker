import React, { forwardRef, useState } from 'react';
import {
  Typography,
  IconButton,
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
import CloseIcon from '@mui/icons-material/Close';
import { FormikProps, Formik } from 'formik';
import { AddNewProjectValues } from './AddNewProject';

export const SummaryStep = forwardRef<FormikProps<AddNewProjectValues>>(
  (_, ref) => {
    const initialValues: AddNewProjectValues = {};

    // TODO Add work data from backend
    const rows = [
      { employee: 'Andriy P', allocation: 1, rate: 88 },
      { employee: 'Andriy R', allocation: 1, rate: 88 },
      { employee: 'Andriy S', allocation: 1, rate: 88 },
    ];

    return (
      <Formik
        innerRef={ref}
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log('values===', values);
        }}
      >
        {(props) => (
          <form>
            <Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">Summary</Typography>
                <IconButton>
                  <CloseIcon />
                </IconButton>
              </Stack>

              <Stack mt={3} mb={1} gap={2}>
                <Typography variant="subtitle1" component="div">
                  Please review the information before creation
                </Typography>
                <List>
                  <ListItem sx={{ paddingLeft: 0 }}>
                    <ListItemText primary="Project name:" />
                  </ListItem>
                  <ListItem sx={{ paddingLeft: 0 }}>
                    <ListItemText primary="Client:" />
                  </ListItem>
                  <ListItem sx={{ paddingLeft: 0 }}>
                    <ListItemText primary="Project type" />
                  </ListItem>
                  <ListItem sx={{ paddingLeft: 0 }}>
                    <ListItemText primary="Project duration" />
                  </ListItem>
                  <ListItem sx={{ paddingLeft: 0 }}>
                    <ListItemText primary="Project manager" />
                  </ListItem>
                </List>
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
                        <TableCell
                          sx={{ fontWeight: 900, paddingRight: '100px' }}
                        >
                          Employee
                        </TableCell>
                        <TableCell sx={{ fontWeight: 900 }}>
                          Allocation, %
                        </TableCell>
                        <TableCell sx={{ fontWeight: 900 }}>Rate, $</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.employee}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.employee}
                          </TableCell>
                          <TableCell>{row.allocation}</TableCell>
                          <TableCell>{row.rate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Stack>
            </Stack>
          </form>
        )}
      </Formik>
    );
  }
);

SummaryStep.displayName = 'SummaryStep';
