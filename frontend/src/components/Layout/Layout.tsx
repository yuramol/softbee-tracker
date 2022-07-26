import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header, HeaderProps } from '../Header';

export const Layout: React.FC<HeaderProps> = ({ pages }) => (
  <>
    <Header pages={pages} />
    <Outlet />
  </>
);
