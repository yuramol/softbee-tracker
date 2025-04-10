import { getFormattedDate } from 'helpers';
import { minutesToTime } from 'helpers/minutesToTime';
import {
  useAuthUser,
  useNormalizedTrackers,
  useNormalizedUsers,
  useProjects,
  useReportPDF,
} from 'hooks';
import { Button, MultipleSelect, RangeCalendar, Toggle } from 'legos';
import { useSnackbar } from 'notistack';
import Papa from 'papaparse';
import React from 'react';
import { theme } from 'theme';

import { Stack } from '@mui/material';

import { reportRangeDates } from './helpers';

type Props = {
  checked: boolean;
  setChecked: (checked: boolean) => void;
  selectedDates: Date[];
  selectedEmployees: string[];
  selectedProjects: string[];
  setSelectedDates: React.Dispatch<React.SetStateAction<Date[]>>;
  setSelectedEmployees: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedProjects: React.Dispatch<React.SetStateAction<string[]>>;
};

export const ReportPageSidebar: React.FC<Props> = ({
  checked,
  setChecked,
  selectedDates,
  selectedEmployees,
  selectedProjects,
  setSelectedDates,
  setSelectedEmployees,
  setSelectedProjects,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { isManager } = useAuthUser();
  const { activeUsers } = useNormalizedUsers({
    blocked: { eq: false },
  });

  const reportFilter = {
    user: {
      id: { in: selectedEmployees },
    },
    project: {
      id: { in: selectedProjects },
    },
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

  const { fetchTrackers } = useNormalizedTrackers(reportFilter);

  const { projectsChoices } = useProjects();
  const { downloadPDF } = useReportPDF();

  const handleDownloadCSV = async () => {
    const { data } = await fetchTrackers({
      variables: {
        filters: reportFilter,
        pagination: {
          limit: -1,
        },
      },
      fetchPolicy: 'network-only',
    });

    if (data?.trackers?.data?.length) {
      const csv = Papa.unparse(
        data?.trackers.data.map(track => ({
          project: track.attributes?.project?.data?.attributes?.name,
          workers: `${
            track.attributes?.user?.data?.attributes?.firstName ?? ''
          } ${track.attributes?.user?.data?.attributes?.lastName ?? ''}`,
          duration: minutesToTime(track.attributes?.durationMinutes ?? 0),
        })) ?? [],
      );

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Tracking-Report.csv');
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } else {
      enqueueSnackbar("There's nothing to report on — yet", {
        variant: 'warning',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        preventDuplicate: true,
      });
    }
  };

  const handleDownload = () => {
    let usersIds;
    let projectsIds;
    if (selectedEmployees.length > 0) {
      usersIds = selectedEmployees.join('&usersIds=');
    } else {
      usersIds = activeUsers.map(item => item.value).join('&usersIds=');
    }
    if (selectedProjects.length > 0) {
      projectsIds = selectedProjects.join('&projectsIds=');
    } else {
      projectsIds = projectsChoices
        .map(item => item.value)
        .join('&projectsIds=');
    }
    downloadPDF({
      variables: {
        query: `usersIds=${usersIds}&projectsIds=${projectsIds}&start=${getFormattedDate(
          selectedDates[0],
        )}${
          selectedDates[1] ? `&end=${getFormattedDate(selectedDates[1])}` : ''
        }`,
      },
    }).then(({ data }) => {
      if (data) {
        const blob = new Blob([data.reportPDF.blob], {
          type: 'application/pdf',
        });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Tracking-Report';
        link.click();
      }
    });
  };

  return (
    <Stack gap={3}>
      <RangeCalendar
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        defaultRangeDates={reportRangeDates}
      />
      {isManager && (
        <MultipleSelect
          label="Employees"
          size="small"
          variant="outlined"
          items={activeUsers}
          value={selectedEmployees}
          setValue={setSelectedEmployees}
        />
      )}
      <MultipleSelect
        label="Projects"
        size="small"
        variant="outlined"
        items={projectsChoices}
        value={selectedProjects}
        setValue={setSelectedProjects}
      />
      <Toggle
        checked={checked}
        setChecked={setChecked}
        label={'Show vacation and sickness'}
      />
      <Stack alignItems="center" gap={2}>
        <Button
          variant="contained"
          title="Download PDF"
          icon="download"
          onClick={handleDownload}
        />
        <Button
          variant="contained"
          title="Download CSV"
          icon="download"
          sx={{
            backgroundColor: theme.palette.warning.main,
            ':hover': {
              backgroundColor: theme.palette.warning.dark,
            },
          }}
          onClick={handleDownloadCSV}
        />
      </Stack>
    </Stack>
  );
};
