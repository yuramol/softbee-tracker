import { TIME_ENTRY_FIELDS } from './TrackerEntryForm';

export type TimeEntryValues = {
  [TIME_ENTRY_FIELDS.DATE]: Date;
  [TIME_ENTRY_FIELDS.DURATION]: string;
  [TIME_ENTRY_FIELDS.DESCRIPTION]?: string;
  [TIME_ENTRY_FIELDS.PROJECT]?: string;
  [TIME_ENTRY_FIELDS.STATUS]?: string;
  [TIME_ENTRY_FIELDS.USER]?: string;
};

export type TrackerEntryFormProps = {
  titleForm: string;
  isLive?: boolean;
  userId: string;
  onSubmit: (values: TimeEntryValues) => void;
  onClose: () => void;
  initialValuesForm?: TimeEntryValues;
  buttonCloseTitle?: string;
  buttonSubmitTitle?: string;
};
