import { Enum_Tracker_Status } from 'types/GraphqlTypes';
import { TIME_ENTRY_FIELDS } from './TrackerEntryForm';

export type TimeEntryValues = {
  [TIME_ENTRY_FIELDS.DATE]: Date;
  [TIME_ENTRY_FIELDS.DURATION]: number;
  [TIME_ENTRY_FIELDS.DESCRIPTION]?: string;
  [TIME_ENTRY_FIELDS.PROJECT]?: string;
  [TIME_ENTRY_FIELDS.STATUS]?: Enum_Tracker_Status;
  [TIME_ENTRY_FIELDS.USER]?: string;
};

export type TrackerEntryFormProps = {
  titleForm: string;
  userId?: string;
  projectId?: string;
  withEmployee?: boolean;
  isLive?: boolean;
  onSubmit: (values: TimeEntryValues) => void;
  onClose: () => void;
  initialValuesForm?: TimeEntryValues;
  buttonCloseTitle?: string;
  buttonSubmitTitle?: string;
};
