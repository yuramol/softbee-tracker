import { MenuType } from 'constant/types';

export type Page = {
  index: boolean;
  name: string;
  href: string;
  menuType: MenuType[];
};

export type HeaderProps = {
  pages: Page[];
};
