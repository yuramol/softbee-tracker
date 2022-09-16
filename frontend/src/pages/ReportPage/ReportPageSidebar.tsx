import React from 'react';
import { IconButton, Stack } from '@mui/material';

import { Icon, MultipleSelect, RangeCalendar } from 'legos';
import {
  useAuthUser,
  useNormalizedUsers,
  useProjects,
  useReportPDF,
} from 'hooks';
import { reportRangeDates } from 'helpers';

type Props = {
  selectedDates: string[];
  selectedEmployees: string[];
  selectedProjects: string[];
  setSelectedDates: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedEmployees: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedProjects: React.Dispatch<React.SetStateAction<string[]>>;
};

export const ReportPageSidebar: React.FC<Props> = ({
  selectedDates,
  selectedEmployees,
  selectedProjects,
  setSelectedDates,
  setSelectedEmployees,
  setSelectedProjects,
}) => {
  const { isManager } = useAuthUser();
  const { usersChoices } = useNormalizedUsers();
  const { projectsChoices } = useProjects();
  const { downloadPDF } = useReportPDF();

  const handleDownload = () => {
    downloadPDF({
      variables: {
        query:
          'userId=1&projectsId=2&projectsId=1&start=2022-09-01&end=2022-09-30',
      },
    }).then(({ data }) => {
      if (data) {
        const blob = new Blob([data.reportPDF.blob], {
          type: 'application/pdf',
        });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'test';
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
          items={usersChoices}
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
      <Stack alignItems="center">
        <IconButton color="primary" onClick={handleDownload}>
          <Icon icon="download" />
        </IconButton>
      </Stack>
    </Stack>
  );
};
