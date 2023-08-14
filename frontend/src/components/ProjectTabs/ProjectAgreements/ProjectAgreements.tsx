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

  return (
    <Stack>
      <Typography fontSize={18} mb={2}>
        Rate agreements
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{`Project - ${projectData?.name}`}</TableCell>
              <TableCell>Rate, $</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectData?.salary?.map((item) => (
              <TableRow key={`${item?.id}-${item?.rate}`}>
                <TableCell component="th" scope="row">
                  {`${item?.users?.data?.attributes?.firstName} ${item?.users?.data?.attributes?.lastName}`}
                </TableCell>
                <TableCell>{item?.rate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
