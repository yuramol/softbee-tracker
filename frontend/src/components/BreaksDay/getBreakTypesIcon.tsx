import React from 'react';

import { Breaks } from 'constant';
import { Icon, IconsNames } from 'legos/Icon';
import { toUpperCaseFirst } from '../../helpers/toUpperCaseFirst';

export const getBreakTypesIcon = (value?: string) => {
  let icon: IconsNames = 'moneyOff';

  if (toUpperCaseFirst(Breaks.Vacation) === value) {
    icon = 'sailing';
  } else if (toUpperCaseFirst(Breaks.Sickness) === value) {
    icon = 'medicalServices';
  }
  return <Icon icon={icon} />;
};
