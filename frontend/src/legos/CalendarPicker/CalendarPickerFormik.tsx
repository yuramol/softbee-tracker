import React from 'react';
import { useField } from 'formik';
import { CalendarPicker, CalendarPickerProps } from './CalendarPicker';

type CalendarPickerFormikProps = Omit<
  CalendarPickerProps,
  'onChange' | 'value'
> & {
  field: string;
  variant?: 'filled' | 'outlined' | 'standard' | undefined;
};

export const CalendarPickerFormik = ({
  field,
  variant,
  ...arg
}: CalendarPickerFormikProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ value }, _, { setValue }] = useField(field);
  return (
    <CalendarPicker
      {...arg}
      value={value}
      variant={variant}
      onChange={(newValue) => {
        setValue(newValue ?? new Date());
      }}
    />
  );
};
