import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { HeaderProps } from '../Header/types';

export const Layout: React.FC<HeaderProps> = ({ pages }) => (
  <>
    <Header pages={pages} />
    <Outlet />
  </>
);
