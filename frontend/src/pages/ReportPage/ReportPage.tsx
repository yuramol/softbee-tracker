import React, { useEffect, useMemo, useState } from 'react';
import { Close } from '@mui/icons-material';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { Drawer, IconButton, Stack, Typography } from '@mui/material';

import { Button } from 'legos';
import { PageProps } from '../types';
import { breaksTitles } from 'constant';
import { getFormattedDate, getHours } from 'helpers';
import { ReportPageSidebar } from './ReportPageSidebar';
import { useNormalizedTrackers, useAuthUser } from 'hooks';
import { MainWrapper, ReportTable } from '../../components';

const ReportPage: React.FC<PageProps> = ({ title }) => {
  const { user, isManager } = useAuthUser();
  const [openDrawer, setOpenDrawer] = useState(false);

  const [selectedDates, setSelectedDates] = useState([
    startOfMonth(new Date()),
    endOfMonth(new Date()),
  ]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [checked, setChecked] = useState(true);

  let reportFilter = {};
  if (isManager) {
    reportFilter = {
      user: { id: { in: [user.id] } },
      ...(selectedEmployees.length > 0
        ? {
            user: {
              id: { in: selectedEmployees },
            },
          }
        : {}),
      ...(selectedProjects.length > 0
        ? {
            project: {
              id: { in: selectedProjects },
            },
          }
        : {}),
      date:
        selectedDates.length > 1
          ? {
              between: [
                getFormattedDate(selectedDates[0]),
                getFormattedDate(selectedDates[1]),
              ],
            }
          : { eq: getFormattedDate(selectedDates[0]) },
    };
  } else {
    reportFilter = {
      user: { id: { in: [user.id] } },
    };
  }
  const { fetchTrackers, normalizedTrackers } = useNormalizedTrackers(
    reportFilter,
    true
  );

  useEffect(() => {
    fetchTrackers({
      variables: { filters: reportFilter },
    });
  }, [selectedDates, selectedEmployees, selectedProjects, user.id]);

  const totalTracked = useMemo(() => {
    let totalTime = 0;
    normalizedTrackers.forEach(({ total }) => (totalTime += total));

    return totalTime;
  }, [normalizedTrackers]);

  const totalTrackedWithoutVacations = useMemo(() => {
    let totalTime = 0;
    normalizedTrackers.forEach(({ trackersByProject }) => {
      trackersByProject.forEach(({ name, total }) => {
        if (breaksTitles.includes(name as string)) {
          totalTime += total;
        } else {
          return;
        }
      });
    });

    return totalTime;
  }, [normalizedTrackers]);

  const reportSidebarProps = {
    checked,
    setChecked,
    selectedDates,
    selectedEmployees,
    selectedProjects,
    setSelectedDates,
    setSelectedEmployees,
    setSelectedProjects,
  };

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  return (
    <MainWrapper sidebar={<ReportPageSidebar {...reportSidebarProps} />}>
      <Typography variant="h1">{title}</Typography>
      <Button
        sx={{ my: 2, display: { lg: 'none' } }}
        variant="contained"
        title="Open sidebar"
        size="large"
        onClick={toggleDrawer}
      />
      <Stack mt={6} flexDirection="row" justifyContent="space-between">
        <Stack flexDirection="row" gap={2}>
          <Typography fontWeight="600">Period:</Typography>
          <Typography>
            {`${format(selectedDates[0], 'd MMM yyyy')}${
              selectedDates[1]
                ? ` - ${format(selectedDates[1], 'd MMM yyyy')}`
                : ''
            }`}
          </Typography>
        </Stack>
        <Stack flexDirection="row" gap={2}>
          <Typography fontWeight="600">Total tracked:</Typography>
          <Typography>
            {getHours(
              checked
                ? totalTracked
                : totalTracked - totalTrackedWithoutVacations
            )}
          </Typography>
        </Stack>
      </Stack>
      <Stack mt={6}>
        <ReportTable trackers={normalizedTrackers} isShowVacation={checked} />
      </Stack>
      <Drawer
        open={openDrawer}
        onClose={toggleDrawer}
        sx={{
          m: 4,
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: 'fit-content',
          },
        }}
      >
        <Stack position="relative" flexDirection="column" p={4} pt={8}>
          <IconButton
            onClick={toggleDrawer}
            sx={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
          <ReportPageSidebar {...reportSidebarProps} />
        </Stack>
      </Drawer>
    </MainWrapper>
  );
};

export default ReportPage;
