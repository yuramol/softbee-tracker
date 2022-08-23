import { lazy } from 'react';
import { Role } from './types';

export const pages = [
  {
    index: true,
    name: 'Login',
    href: '/login',
    mainMenu: true,
    role: [Role.Public],
    Component: lazy(() => import('pages/LoginPage')),
  },
  {
    index: false,
    name: 'Register',
    href: '/register',
    mainMenu: true,
    role: [Role.Public],
    Component: lazy(() => import('pages/LoginPage')),
  },
  {
    index: true,
    name: 'Tracker',
    href: '/',
    mainMenu: true,
    role: [Role.Employee, Role.Manager],
    Component: lazy(() => import('pages/HomePage')),
  },
  {
    index: false,
    name: 'Crew',
    href: '/crew',
    mainMenu: true,
    role: [Role.Employee, Role.Manager],
    Component: lazy(() => import('pages/CrewPage/CrewPage')),
  },
  {
    index: false,
    name: 'Profile',
    href: '/profile',
    mainMenu: false,
    role: [Role.Employee, Role.Manager],
    Component: lazy(() => import('pages/ProfilePage/ProfilePage')),
  },
  {
    index: false,
    name: 'Projects',
    href: '/projects',
    mainMenu: true,
    role: [Role.Manager],
    Component: lazy(() => import('pages/ProjectPage/ProjectPage')),
  },
  {
    index: false,
    name: 'Reports',
    href: '/reports',
    mainMenu: true,
    role: [Role.Manager],
    Component: lazy(() => import('pages/ReportPage')),
  },
];
