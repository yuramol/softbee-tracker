import React from 'react';
import { useQuery } from '@apollo/client';

import {
  Enum_Tracker_Livestatus,
  TrackerEntityResponseCollection,
  TrackerFiltersInput,
} from 'types/GraphqlTypes';
import { TRACKERS_LIVE_QUERY } from 'api';

import { ShowTracker } from './ShowTracker';

type ShowTrackersProps = {
  userId: string;
};
export const ShowTrackers = ({ userId }: ShowTrackersProps) => {
  const { data } = useQuery<
    {
      trackers: TrackerEntityResponseCollection;
    },
    {
      filters: TrackerFiltersInput;
    }
  >(TRACKERS_LIVE_QUERY, {
    variables: {
      filters: {
        user: { id: { eq: userId } },
        live: { eq: true },
        liveStatus: { not: { eq: Enum_Tracker_Livestatus.Finish } },
      },
    },
  });
  const trackers = data?.trackers.data;
  return (
    <>
      {trackers?.map((tracker) => (
        <ShowTracker tracker={tracker} key={tracker.id} />
      ))}
    </>
  );
};
