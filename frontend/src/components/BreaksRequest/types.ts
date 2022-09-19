import { TIME_ENTRY_FIELDS } from 'components/TrackerEntryModalForm/TrackerEntryForm';

export type BreaksRequestFormProps = {
  onClose: () => void;
};

export const BreaksRequestFields = {
  ...TIME_ENTRY_FIELDS,
} as const;
