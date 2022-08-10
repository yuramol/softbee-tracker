import React, { useState } from 'react';
import {
  Button,
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
import { useFormik, FormikContext } from 'formik';

type SummaryStepProps = {
  handleNext: (values: any) => void;
};

interface SummaryStepEntryValues {
  manager: string;
  hourlyRate: string;
  employee: string;
  rate: string;
}

export const SummaryStep = ({ handleNext }: SummaryStepProps) => {
  const formik = useFormik<SummaryStepEntryValues>({
    initialValues: {
      manager: '',
      hourlyRate: '',
      employee: '',
      rate: '',
    },
    onSubmit: (values) => {
      handleNext(values);
      console.log('===', values);
    },
  });

  const { handleChange, handleSubmit } = formik;

  // TODO Add work data from backend
  const rows = [
    { employee: 'Andriy P', allocation: 1, rate: 88 },
    { employee: 'Andriy R', allocation: 1, rate: 88 },
    { employee: 'Andriy S', allocation: 1, rate: 88 },
  ];

  return (
    <FormikContext.Provider value={formik}>
      <form onSubmit={handleSubmit}>
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
                    <TableCell sx={{ fontWeight: 900, paddingRight: '100px' }}>
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
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
    </FormikContext.Provider>
  );
};
