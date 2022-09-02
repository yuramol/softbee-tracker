import React, { useMemo, useState } from 'react';
import { format } from 'date-fns';
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { MainWrapper } from '../../components';
import { PageProps } from '../types';
import { useNormalizedTrackers } from 'hooks';
import {
  getFormattedDate,
  getHours,
  getMinutes,
  parseTrackerTime,
} from 'helpers';
import { ReportPageSidebar } from './ReportPageSidebar';

const reportTableHead = ['Date', 'Description', 'Time'];

const ReportPage: React.FC<PageProps> = ({ title }) => {
  const [selectedDates, setSelectedDates] = useState<string[]>([
    getFormattedDate(new Date()),
  ]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const reportFilter = {
    user: {
      id: selectedEmployees.length !== 0 ? { in: selectedEmployees } : {},
    },
    project: {
      id: selectedProjects.length !== 0 ? { in: selectedProjects } : {},
    },
    date:
      selectedDates.length > 1
        ? { between: selectedDates }
        : { eq: selectedDates[0] },
  };

  const { trackers } = useNormalizedTrackers(reportFilter);

  const reportTotalTime = useMemo(() => {
    let totalTime = '0:00';

    trackers.forEach(({ total }) => {
      totalTime = getHours(
        getMinutes(totalTime, 'HH:mm') + getMinutes(total, 'HH:mm')
      );
    });

    return totalTime;
  }, [trackers]);

  const reportSidebarProps = {
    selectedDates,
    selectedEmployees,
    selectedProjects,
    setSelectedDates,
    setSelectedEmployees,
    setSelectedProjects,
  };

  return (
    <MainWrapper sidebar={<ReportPageSidebar {...reportSidebarProps} />}>
      <Typography variant="h1">{title}</Typography>
      <Stack mt={6} flexDirection="row" justifyContent="space-between">
        <Stack flexDirection="row" gap={2}>
          <Typography fontWeight="600">Period:</Typography>
          <Typography>
            {`${format(new Date(selectedDates[0]), 'd MMM yyyy')}${
              selectedDates[1]
                ? ` - ${format(new Date(selectedDates[1]), 'd MMM yyyy')}`
                : ''
            }`}
          </Typography>
        </Stack>
        <Stack flexDirection="row" gap={2}>
          <Typography fontWeight="600">Total:</Typography>
          <Typography>{reportTotalTime}</Typography>
        </Stack>
      </Stack>
      <Stack mt={6}>
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
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ width: 125 }}
                        >
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
                          {format(
                            parseTrackerTime(attributes?.duration),
                            'HH:mm'
                          )}
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
      </Stack>
    </MainWrapper>
  );
};

export default ReportPage;
