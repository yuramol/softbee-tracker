import * as React from 'react';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ButtonGroup, Button } from '@mui/material';
import { useCurrentWeek } from 'hooks';
import {
  endOfDecade,
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  format,
  startOfDecade,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  subMonths,
  subQuarters,
  subWeeks,
  subYears,
} from 'date-fns';

export const RangeCalendar = () => {
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const [dateValue, setDateValue] = React.useState<string[] | null[]>([
    null,
    null,
  ]);

  console.log(dateValue);

  const { weekStart, weekEnd, days, currentDay } = useCurrentWeek(new Date());

  console.log(weekStart, weekEnd, days, currentDay);

  const inspectionTypes = [
    {
      label: 'Сurrent week',
      value: 'currentWeek',
    },
    {
      label: 'Last week',
      value: 'lastWeek',
    },
    {
      label: 'Current month',
      value: 'currentMonth',
    },
    {
      label: 'Last month',
      value: 'lastMonth',
    },
    {
      label: 'Current quarter',
      value: 'currentQuarter',
    },
    {
      label: 'Past quarter',
      value: 'pastQuarter',
    },
    {
      label: 'Current year',
      value: 'currentYear',
    },
    {
      label: 'Past year',
      value: 'pastYear',
    },
  ];
  const [inspectBy, setInspectBy] = React.useState(inspectionTypes[0]);

  const handleClickButton = (index: number) => {
    setInspectBy(inspectionTypes[index]);

    // setDateValue([
    //   format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    //   format(endOfMonth(new Date()), 'yyyy-MM-dd'),
    // ]);
    // setDateValue([
    //   format(startOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd'),
    //   format(endOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd'),
    // ]);
  };

  // curr week
  // console.log(
  //   startOfWeek(new Date(), { weekStartsOn: 1 }),
  //   endOfWeek(new Date(), { weekStartsOn: 1 })
  // );
  // past week
  // console.log(
  //   startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
  //   endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 })
  // );

  // curr year
  // console.log(startOfYear(new Date()), endOfYear(new Date()));

  // past year
  // console.log(
  //   startOfYear(subYears(new Date(), 1)),
  //   endOfYear(subYears(new Date(), 1))
  // );
  // curr Quater
  // console.log(startOfQuarter(new Date()), endOfQuarter(new Date()));

  // past Quater
  // console.log(
  //   startOfQuarter(subQuarters(new Date(), 1)),
  //   endOfQuarter(subQuarters(new Date(), 1))
  // );

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Basic example"
          value={value}
          views={['day']}
          closeOnSelect={false}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <ButtonGroup size="small" orientation="vertical">
        {inspectionTypes.map(({ label, value }, i) => (
          <Button
            key={value}
            variant={inspectBy.value === value ? 'contained' : 'outlined'}
            onClick={() => handleClickButton(i)}
          >
            {label}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
};
