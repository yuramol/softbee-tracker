import React, { useMemo, useState } from 'react';
import { format } from 'date-fns';
import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { MainWrapper, RangeCalendar } from '../components';
import { PageProps } from './types';
import { useAuthUser, useNormalizedTrackers, useNormalizedUsers } from 'hooks';
import { getHours, getMinutes, parseTrackerTime } from 'helpers';
import { Icon, MultipleSelect } from 'legos';

const reportTableHead = ['Date', 'Description', 'Time'];

const ReportPage: React.FC<PageProps> = ({ title }) => {
  const { user } = useAuthUser();
  const { usersChoices } = useNormalizedUsers();

  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const handleChangeUsers = (value: string[]) => {
    setSelectedEmployees(value);
  };

  const [startDate, setStartDate] = useState(
    format(new Date('2022-07-01'), 'YYY-MM-dd')
  );
  const [endDate, setEndDate] = useState(
    format(new Date('2022-07-31'), 'YYY-MM-dd')
  );

  const { trackers } = useNormalizedTrackers({
    user: { id: { in: [user.id] } },
    date: { between: [startDate, endDate] },
  });

  const reportTotalTime = useMemo(() => {
    let totalTime = '00:00';

    trackers.forEach(({ total }) => {
      totalTime = getHours(
        getMinutes(totalTime, 'HH:mm') + getMinutes(total, 'HH:mm')
      );
    });

    return totalTime;
  }, [trackers]);

  const { trackers } = useNormalizedTrackers({
    user: { id: { in: [user.id] } },
    date: { between: [startDate, endDate] },
  });

  const reportTotalTime = useMemo(() => {
    let totalTime = '00:00';

    trackers.forEach(({ total }) => {
      totalTime = getHours(
        getMinutes(totalTime, 'HH:mm') + getMinutes(total, 'HH:mm')
      );
    });

    return totalTime;
  }, [trackers]);

  return (
    <MainWrapper
      sidebar={
        <Stack spacing={2}>
          <RangeCalendar />
          <MultipleSelect
            label="Employees"
            size="small"
            variant="outlined"
            IconComponent={() => <Icon icon="add" />}
            items={usersChoices}
            value={selectedEmployees}
            onChange={(e) => handleChangeUsers(e.target.value as string[])}
          />
          <MultipleSelect
            label="Projects"
            size="small"
            variant="outlined"
            IconComponent={() => <Icon icon="add" />}
          />
          <Stack alignItems="center">
            <IconButton color="primary">
              <Icon icon="download" />
            </IconButton>
          </Stack>
        </Stack>
      }
    >
      <Typography variant="h1">{title}</Typography>
      <Stack mt={6} flexDirection="row" justifyContent="space-between">
        <Stack flexDirection="row" gap={2}>
          <Typography fontWeight="600">Period:</Typography>
          <Typography>
            {format(new Date(startDate), 'd MMM y')} -{' '}
            {format(new Date(endDate), 'd MMM y')}
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
                    trackers.map(({ id, attributes }, trackerIndex) => (
                      <TableRow
                        key={id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        {trackerIndex === 0 && (
                          <TableCell
                            component="th"
                            scope="row"
                            rowSpan={trackers.length}
                            sx={{ width: 125 }}
                          >
                            {format(new Date(date), 'd MMM y')}
                          </TableCell>
                        )}
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
