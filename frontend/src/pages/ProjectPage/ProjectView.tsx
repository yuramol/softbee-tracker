import React from 'react';

import { useProject } from '../../hooks/useProject';
import { Enum_Project_Type, Scalars } from 'types/GraphqlTypes';
import { Link, Stack, Typography } from '@mui/material';
import { Avatar, Icon, NavLink } from 'legos';
import { getMinutes, getTotalTime, parseTrackerTime } from 'helpers';
import { format } from 'date-fns';

type Props = {
  id: Scalars['ID'];
};
export const ProjectView = ({ id }: Props) => {
  const { projectData } = useProject(id);
  const getProjectIcon: (type?: string) => JSX.Element | null = (type) => {
    switch (type) {
      case Enum_Project_Type.TimeMaterial:
        return <Icon icon="paidOutlined" color="warning" />;
      case Enum_Project_Type.FixedPrice:
        return <Icon icon="paidOutlined" color="success" />;
      case Enum_Project_Type.NonProfit:
        return <Icon icon="paidOutlined" color="error" />;
      default:
        return null;
    }
  };

  const trakedTime = format(
    parseTrackerTime(projectData?.trackers?.data[0].attributes?.duration),
    'HH:mm'
  );

  return (
    <>
      <Stack flexDirection="row" gap={8}>
        <Stack gap={4}>
          <Stack>
            <Typography variant="h1">{projectData?.name}</Typography>
            <Typography fontSize="15px" color="GrayText">
              Project details
            </Typography>
          </Stack>
          <Stack flexDirection="row" alignItems="center" gap={1}>
            <Avatar
              avatar={
                projectData?.managers?.data[0].attributes?.avatar.data
                  ?.attributes?.url
                  ? `${process.env.REACT_APP_URI}${projectData?.managers?.data[0].attributes?.avatar.data?.attributes?.url}`
                  : undefined
              }
              firstName={projectData?.managers?.data[0].attributes?.firstName}
              lastName={projectData?.managers?.data[0].attributes?.lastName}
            />
            <Stack flexGrow="1">
              <Typography fontSize="15px" color="GrayText">
                Project manager
              </Typography>
              <Link
                to={`/profile/${projectData?.managers?.data[0].id}`}
                component={NavLink}
              >
                {`${projectData?.managers?.data[0].attributes?.firstName} ${projectData?.managers?.data[0].attributes?.lastName}`}
              </Link>
            </Stack>
          </Stack>
          <Stack flexDirection="row" alignItems="center" gap={3}>
            <Stack>{getProjectIcon(projectData?.type)}</Stack>

            <Stack flexGrow="1">
              <Typography fontSize="15px" color="GrayText">
                Project type
              </Typography>
              <Typography>{projectData?.type}</Typography>
            </Stack>
          </Stack>
          <Stack flexDirection="row" alignItems="center" gap={3}>
            <Icon icon="calendarMonth" />

            <Stack flexGrow="1">
              <Typography fontSize="15px" color="GrayText">
                Project start
              </Typography>
              <Typography>{projectData?.start}</Typography>
            </Stack>
          </Stack>
          {projectData?.end && (
            <Stack flexDirection="row" alignItems="center" gap={3}>
              <Icon icon="calendarMonth" />

              <Stack flexGrow="1">
                <Typography fontSize="15px" color="GrayText">
                  Project end
                </Typography>
                <Typography>{projectData?.end}</Typography>
              </Stack>
            </Stack>
          )}

          <Stack flexDirection="row" alignItems="center" gap={3}>
            <Icon icon="person" />

            <Stack flexGrow="1">
              <Typography fontSize="15px" color="GrayText">
                Client
              </Typography>
              <Typography>{projectData?.client}</Typography>
            </Stack>
          </Stack>
          {projectData?.trackers?.data[0]?.attributes?.duration && (
            <Stack flexDirection="row" alignItems="center" gap={3}>
              <Icon icon="calendarMonth" />

              <Stack flexGrow="1">
                <Typography fontSize="15px" color="GrayText">
                  Tracked time
                </Typography>
                <Typography>{trakedTime}</Typography>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
};
