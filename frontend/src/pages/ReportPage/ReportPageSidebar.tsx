import React from 'react';
import { Stack } from '@mui/material';

import { Button, MultipleSelect, RangeCalendar } from 'legos';
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
    const userId = selectedEmployees.join(`&userId=`);
    const projectsId = selectedProjects.join(`&projectsId=`);
    const range = selectedDates.join(`&end=`);
    downloadPDF({
      variables: {
        query: `${selectedEmployees.length > 0 ? `userId=${userId}&` : ''}${
          selectedProjects.length > 0 ? `projectsId=${projectsId}&` : ''
        }start=${range}`,
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
        <Button
          variant="contained"
          title="Download PDF"
          icon="download"
          onClick={handleDownload}
        />
      </Stack>
    </Stack>
  );
};
