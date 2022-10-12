import { Enum_Tracker_Status } from 'types/GraphqlTypes';
import { TRANSACTION_ENTRY_FIELDS } from './TransactionEntryForm';

export type TransactionEntryValues = {
  [TRANSACTION_ENTRY_FIELDS.DATE]: Date;
  [TRANSACTION_ENTRY_FIELDS.DURATION]: number;
  [TRANSACTION_ENTRY_FIELDS.DESCRIPTION]?: string;
  [TRANSACTION_ENTRY_FIELDS.PROJECT]?: string;
  [TRANSACTION_ENTRY_FIELDS.STATUS]?: Enum_Tracker_Status;
  [TRANSACTION_ENTRY_FIELDS.USER]?: string;
};

export type TransactionEntryFormProps = {
  titleForm: string;
  userId?: string;
  projectId?: string;
  withEmployee?: boolean;
  isLive?: boolean;
  onSubmit: (values: TransactionEntryValues) => void;
  onClose: () => void;
  initialValuesForm?: TransactionEntryValues;
  buttonCloseTitle?: string;
  buttonSubmitTitle?: string;
};
