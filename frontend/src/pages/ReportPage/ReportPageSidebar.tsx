import React from 'react';
import { Stack } from '@mui/material';

import { Button, MultipleSelect, RangeCalendar, Toggle } from 'legos';
import {
  useAuthUser,
  useNormalizedUsers,
  useProjects,
  useReportPDF,
} from 'hooks';
import { reportRangeDates } from 'helpers';

type Props = {
  checked: boolean;
  setChecked: (checked: boolean) => void;
  selectedDates: string[];
  selectedEmployees: string[];
  selectedProjects: string[];
  setSelectedDates: React.Dispatch<React.SetStateAction<string[]>>;
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
  const { isManager } = useAuthUser();
  const { usersChoices } = useNormalizedUsers();
  const { projectsChoices } = useProjects();
  const { downloadPDF } = useReportPDF();
  const handleDownload = () => {
    let usersIds;
    let projectsIds;
    if (selectedEmployees.length > 0) {
      usersIds = selectedEmployees.join('&usersIds=');
    } else {
      usersIds = usersChoices.map((item) => item.value).join('&usersIds=');
    }
    if (selectedProjects.length > 0) {
      projectsIds = selectedProjects.join('&projectsIds=');
    } else {
      projectsIds = projectsChoices
        .map((item) => item.value)
        .join('&projectsIds=');
    }

    const range = selectedDates.join('&end=');
    downloadPDF({
      variables: {
        query: `usersIds=${usersIds}&projectsIds=${projectsIds}&start=${range}`,
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
      <Toggle
        checked={checked}
        setChecked={setChecked}
        label={'Show vacation and sickness'}
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
