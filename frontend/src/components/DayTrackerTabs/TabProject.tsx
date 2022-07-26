import React, { FC, useContext, useState } from 'react';
import { Button, Input, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { format } from 'date-fns';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Tracker } from '../../types/GraphqlTypes';
import { TimeContext } from '../TrackerDayView/TrackerDayView';

type Props = {
  attributes: Maybe<Tracker>;
  parseTime: Date;
  id: Maybe<string>;
};

export const TabProject: FC<Props> = ({ attributes, parseTime, id }) => {
  const [isEdit, setIsEdit] = useState(false);
  const onHaldlerTime = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (e.detail === 2) setIsEdit(!isEdit);
  };
  const func = useContext(TimeContext);

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ mr: 1 }}>
          (
          {attributes?.project?.data?.attributes?.name
            ? attributes?.project?.data?.attributes?.name
            : 'no project'}
          ):
        </Typography>
        <Typography variant="h6">{attributes?.description}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {isEdit ? (
          <Input
            onClick={(e) => onHaldlerTime(e)}
            type="time"
            onChange={(e) => func!.onUpdateTime(e, id)}
            value={format(parseTime, 'HH:mm')}
          />
        ) : (
          <Typography
            sx={{ userSelect: 'none' }}
            onClick={(e) => onHaldlerTime(e)}
          >
            {format(parseTime, 'HH:mm')}
          </Typography>
        )}
        <Button sx={{ mr: '10px', ml: '20px' }} variant="outlined">
          Start
        </Button>
        <Button onClick={() => setIsEdit(!isEdit)} variant="outlined">
          edit
        </Button>
      </Box>
    </>
  );
};
