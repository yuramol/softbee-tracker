import React, { FC, useContext, useState } from 'react';
import { Button, Grid, Input, Typography } from '@mui/material';
import { format } from 'date-fns';

import { TimeContext } from './TrackerDayView';
import { parseTrackerTime } from '../../helpers';
import { Maybe, Tracker } from '../../types/GraphqlTypes';

type Props = {
  id: Maybe<string> | undefined;
  attributes: Maybe<Tracker> | undefined;
  trackerTime: Date;
};

export const ProjectTab: FC<Props> = ({ id, attributes, trackerTime }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [time, setTime] = useState(trackerTime);
  const onHaldlerTime = (detail: number) => {
    if (detail === 2) setIsEdit(!isEdit);
  };
  const { onUpdateTime } = useContext(TimeContext);
  const handleChange = (value: string) => {
    setTime(parseTrackerTime(value, 'HH:mm'));
  };

  return (
    <>
      <Grid marginRight={2}>
        <Typography variant="h6">
          {attributes?.project?.data?.attributes?.name
            ? attributes.project.data.attributes.name
            : 'no project'}
          :
        </Typography>
        <Typography>{attributes?.description}</Typography>
      </Grid>
      <Grid display="flex" alignItems="center">
        {isEdit ? (
          <Input
            type="time"
            value={format(time, 'HH:mm:ss.SSS')}
            onBlur={() => {
              onUpdateTime(time, id);
              setIsEdit(!isEdit);
            }}
            onChange={(e) => handleChange(e.target.value)}
            onClick={(e) => onHaldlerTime(e.detail)}
          />
        ) : (
          <Typography
            sx={{ userSelect: 'none' }}
            onClick={(e) => onHaldlerTime(e.detail)}
          >
            {format(time, 'HH:mm')}
          </Typography>
        )}
        <Button sx={{ mr: '10px', ml: '20px' }} variant="outlined">
          Start
        </Button>
        <Button onClick={() => setIsEdit(!isEdit)} variant="outlined">
          edit
        </Button>
      </Grid>
    </>
  );
};
