export type BreaksRequestFormProps = {
  onClose: () => void;
};

export enum BreaksRequestFields {
  User = 'user',
  Break = 'project',
  Date = 'date',
  Duration = 'duration',
  Comment = 'description',
}
