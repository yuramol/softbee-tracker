import { format } from 'date-fns';

export const getFormattedDate = (date: Date) => format(date, 'yyyy-MM-dd');
