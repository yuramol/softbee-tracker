import React, { FC } from 'react';
import { useTotalTime } from '../../hooks';
import { TrackerEntity } from '../../types/GraphqlTypes';

type Props = {
  currentDateTracks: TrackerEntity[] | undefined;
};

export const TabDuration: FC<Props> = ({ currentDateTracks }) => {
  const { totalTime } = useTotalTime(currentDateTracks);
  return <div>{totalTime}</div>;
};
