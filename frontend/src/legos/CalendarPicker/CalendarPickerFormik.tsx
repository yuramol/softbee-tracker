import React from 'react';
import { useField } from 'formik';
import { CalendarPicker, CalendarPickerProps } from './CalendarPicker';

type CalendarPickerFormikProps = Omit<
  CalendarPickerProps,
  'onChange' | 'value'
> & {
  field: string;
};

export const CalendarPickerFormik = ({
  field,
  ...arg
}: CalendarPickerFormikProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ value }, _, { setValue }] = useField<Date>(field);
  return (
    <CalendarPicker
      {...arg}
      value={value}
      onChange={(newValue) => {
        setValue(newValue ?? new Date());
      }}
    />
  );
};
