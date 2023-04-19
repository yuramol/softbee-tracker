export enum UserPosition {
  Developer = 'developer',
  Designer = 'designer',
  Cdo = 'cdo',
  Cto = 'cto',
}

export const employeePositionChoices = [
  {
    label: 'Developer',
    value: UserPosition.Developer,
  },
  {
    label: 'Designer',
    value: UserPosition.Designer,
  },
  {
    label: 'CDO',
    value: UserPosition.Cdo,
  },
  {
    label: 'CTO',
    value: UserPosition.Cto,
  },
];
