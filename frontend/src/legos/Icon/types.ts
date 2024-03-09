export type IconsNames =
  | 'email'
  | 'link'
  | 'calendarMonth'
  | 'person'
  | 'personOutline'
  | 'phone'
  | 'work'
  | 'money'
  | 'edit'
  | 'playArrow'
  | 'pause'
  | 'deleteOutline'
  | 'menu'
  | 'editOutlined'
  | 'archiveOutlined'
  | 'moneyOff'
  | 'paidOutlined'
  | 'add'
  | 'navigateBefore'
  | 'navigateNext'
  | 'arrowDropDown'
  | 'upWork'
  | 'watch'
  | 'download'
  | 'clear'
  | 'sailing'
  | 'medicalServices'
  | 'info'
  | 'houseboat'
  | 'medication'
  | 'checkCircle'
  | 'highlightOff'
  | 'unarchiveOutlined'
  | 'block';

export type IconsNamesMapType = {
  [key in IconsNames]: React.ElementType;
};

export interface IconProps {
  width?: number;
  height?: number;
  color?:
    | 'inherit'
    | 'action'
    | 'disabled'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  icon: IconsNames;
  size?: 'inherit' | 'large' | 'medium' | 'small';
}
