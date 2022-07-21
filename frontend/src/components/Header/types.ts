export type Page = {
  index: boolean;
  name: string;
  href: string;
  mainMenu: boolean;
};

export type HeaderProps = {
  pages: Page[];
};
