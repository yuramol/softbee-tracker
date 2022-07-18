import moment from 'moment';
import React, { FC } from 'react';
import { TrackerEntity } from '../../types/GraphqlTypes';
type Props = {
  currentDateTracks: TrackerEntity[] | undefined;
};
export const TabDuration: FC<Props> = ({ currentDateTracks }) => {
  let currentDuration = 0;

  currentDateTracks?.map(
    ({ attributes }) =>
      (currentDuration += moment.duration(attributes?.duration).asSeconds())
  );

  //   currentDateTracks?.map(({ attributes }) => setDuration(attributes?.duration));
  return <div>{moment.utc(currentDuration * 1000).format('HH:mm')}</div>;
};
