import React, { useState } from 'react';

import { TimeInspector } from 'components/TimeInspector';
import { TrackerCalendar } from 'components/TrackerCalendar';

export const SideBars = () => {
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());

  return (
    <>
      <TimeInspector />
      <TrackerCalendar
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
    </>
  );
};
