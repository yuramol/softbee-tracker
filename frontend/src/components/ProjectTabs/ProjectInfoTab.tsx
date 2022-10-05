import React from 'react';

import { useProject } from 'hooks';
import { Enum_Project_Type, Scalars } from 'types/GraphqlTypes';
import { Stack, Typography } from '@mui/material';
import { Avatar, Icon, NavLink } from 'legos';
import { parseTrackerTime } from 'helpers';
import { format } from 'date-fns';

type Props = {
  id: Scalars['ID'];
};
export const ProjectInfoTab = ({ id }: Props) => {
  const { projectData } = useProject(id);
  let trakedTime = '';

  const getProjectType: (type?: string) => JSX.Element | null = (type) => {
    switch (type) {
      case Enum_Project_Type.TimeMaterial:
        return (
          <>
            <Icon icon="paidOutlined" color="warning" />
            <Stack flexGrow="1">
              <Typography fontSize="15px" color="GrayText">
                Project type
              </Typography>
              <Typography>Time Material</Typography>
            </Stack>
          </>
        );
      case Enum_Project_Type.FixedPrice:
        return (
          <>
            <Icon icon="paidOutlined" color="success" />
            <Stack flexGrow="1">
              <Typography fontSize="15px" color="GrayText">
                Project type
              </Typography>
              <Typography>Fixed Price</Typography>
            </Stack>
          </>
        );
      case Enum_Project_Type.NonProfit:
        return (
          <>
            <Icon icon="paidOutlined" color="error" />
            <Stack flexGrow="1">
              <Typography fontSize="15px" color="GrayText">
                Project type
              </Typography>
              <Typography>Non Profit</Typography>
            </Stack>
          </>
        );
      default:
        return null;
    }
  };

  if (projectData?.trackers?.data[0]?.attributes?.durationMinutes) {
    trakedTime = format(
      parseTrackerTime(
        projectData?.trackers?.data[0].attributes?.durationMinutes
      ),
      'HH:mm'
    );
  }

  return (
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
              projectData?.manager?.data?.attributes?.avatar?.data?.attributes
                ?.url
                ? `${process.env.REACT_APP_URI}${projectData?.manager?.data?.attributes?.avatar.data?.attributes?.url}`
                : undefined
            }
            firstName={projectData?.manager?.data?.attributes?.firstName}
            lastName={projectData?.manager?.data?.attributes?.lastName}
          />
          <Stack flexGrow="1">
            <Typography fontSize="15px" color="GrayText">
              Project manager
            </Typography>
            <NavLink
              to={`/profile/${projectData?.manager?.data?.id}`}
              state={{ edit: false }}
            >
              {`${projectData?.manager?.data?.attributes?.firstName} ${projectData?.manager?.data?.attributes?.lastName}`}
            </NavLink>
          </Stack>
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap={3}>
          {getProjectType(projectData?.type)}
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
        {!!trakedTime && (
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
  );
};
