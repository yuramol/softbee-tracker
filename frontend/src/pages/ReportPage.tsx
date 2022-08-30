import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { MainWrapper } from '../components';
import { PageProps } from './types';
import { Stack } from '@mui/system';
import { useAuthUser, useNormalizedTrackers } from 'hooks';

const reportTableHead = ['Date', 'Description', 'Time'];

const ReportPage: React.FC<PageProps> = ({ title }) => {
  const { user } = useAuthUser();
  const { trackers } = useNormalizedTrackers(
    user.id,
    '2022-08-01',
    '2022-08-31'
  );

  return (
    <MainWrapper sidebar={<p>Filters</p>}>
      <Typography variant="h1">{title}</Typography>
      <Stack mt={6}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {reportTableHead.map((item, i) => (
                  <TableCell key={i}>{item}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {trackers.map(({ date, trackersByProject }) =>
                trackersByProject.map(({ name, trackers }) =>
                  trackers.map(({ id, attributes }) => (
                    <TableRow
                      key={id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {date}
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">
                          {name}
                          {trackersByProject.length}
                        </Typography>
                        <Typography>{attributes?.description}</Typography>
                      </TableCell>
                      <TableCell>{attributes?.duration}</TableCell>
                    </TableRow>
                  ))
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </MainWrapper>
  );
};

export default ReportPage;
