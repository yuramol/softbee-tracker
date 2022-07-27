import * as React from 'react';
import { TimeInspector } from './TimeInspector';
import { TotalTime } from './TotalTime';

export const TimeSection = () => {
  return (
    <>
      <TimeInspector />
      <TotalTime />
    </>
  );
};
