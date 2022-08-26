import { MenuType } from 'constants/types';

export type Page = {
  index: boolean;
  name: string;
  href: string;
  menuType: MenuType[];
};

export type HeaderProps = {
  pages: Page[];
};
