import React from 'react';

import {
  CalendarMonth,
  Email,
  Link,
  Person,
  Phone,
  Work,
  Money,
} from '@mui/icons-material';

export const renderIcons = (fieldName: string) => {
  switch (fieldName) {
    case 'email':
      return <Email />;
    case 'linkedIn':
      return <Link />;
    case 'phone':
      return <Phone />;
    case 'dateEmployment':
      return <CalendarMonth />;
    case 'position':
      return <Work />;
    case 'lastName':
      return <Person />;
    case 'firstName':
      return <Person />;
    case 'salaryInfo':
      return <Money />;
    default:
      return '';
  }
};
