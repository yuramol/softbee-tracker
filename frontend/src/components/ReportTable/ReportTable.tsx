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
import { parseTrackerTime } from 'helpers';
import { format } from 'date-fns';
import { TrackerByDay } from 'hooks/useNormalizedTrackers';

type ReportTableProps = {
  trackers: TrackerByDay[];
};

const reportTableHead = ['Date', 'Description', 'Time'];

export const ReportTable: React.FC<ReportTableProps> = ({ trackers }) => (
  <>
    {trackers.length > 0 ? (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {reportTableHead.map((item, i) => (
                <TableCell key={i}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody style={{ verticalAlign: 'top' }}>
            {trackers.map(({ date, trackersByProject }) =>
              trackersByProject.map(({ name, trackers }) =>
                trackers.map(({ id, attributes }) => (
                  <TableRow
                    key={id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{ width: 125 }}>
                      {format(new Date(date), 'd MMM y')}
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="600">
                        {name}
                      </Typography>
                      <Typography>{attributes?.description}</Typography>
                      <Typography variant="body2" mt={2}>
                        {`${attributes?.user?.data?.attributes?.firstName}
                      ${attributes?.user?.data?.attributes?.lastName}
                      (${attributes?.user?.data?.attributes?.username})
                      `}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {format(parseTrackerTime(attributes?.duration), 'HH:mm')}
                    </TableCell>
                  </TableRow>
                ))
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <Typography variant="h6">
        There&apos;s nothing to report on — yet. Get tracking first!
      </Typography>
    )}
  </>
);
