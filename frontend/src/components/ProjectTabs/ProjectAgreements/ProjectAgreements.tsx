import React from 'react';
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
import { useProject } from 'hooks';

export const ProjectAgreements = ({ projectId }: { projectId: string }) => {
  const { projectData } = useProject(projectId);

  const MOCKProjectData = [{ project: projectData?.name, rate: 30 }];

  return (
    <Stack>
      <Typography fontSize={18} mb={2}>
        Rate agreements
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project</TableCell>
              <TableCell>Rate, $</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCKProjectData.map(({ project, rate }) => (
              <TableRow key={`${project}-${rate}`}>
                <TableCell component="th" scope="row">
                  {project}
                </TableCell>
                <TableCell>{rate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
