import { lazy } from 'react';
import { MenuType, Role } from './types';

export const pages = [
  {
    index: true,
    name: 'Login',
    href: '/login',
    menuType: [MenuType.Main],
    role: [Role.Public],
    Component: lazy(() => import('pages/LoginPage')),
  },
  {
    index: false,
    name: 'Register',
    href: '/register',
    menuType: [MenuType.Main],
    role: [Role.Public],
    Component: lazy(() => import('pages/LoginPage')),
  },
  {
    index: true,
    name: 'Tracker',
    href: '/',
    menuType: [MenuType.Main],
    role: [Role.Employee, Role.Manager],
    Component: lazy(() => import('pages/HomePage')),
  },
  {
    index: false,
    name: 'Crew',
    href: '/crew',
    menuType: [MenuType.Main],
    role: [Role.Employee, Role.Manager],
    Component: lazy(() => import('pages/CrewPage/CrewPage')),
  },
  {
    index: false,
    name: 'Profile',
    href: '/profile',
    menuType: [MenuType.Secondary],
    role: [Role.Employee, Role.Manager],
    Component: lazy(() => import('pages/ProfilePage/ProfilePage')),
  },
  {
    index: false,
    name: 'View Profile',
    href: '/profile/:userId',
    menuType: [],
    role: [Role.Employee, Role.Manager],
    Component: lazy(() => import('pages/ProfilePage/view')),
  },
  {
    index: false,
    name: 'Projects',
    href: '/projects',
    menuType: [MenuType.Main],
    role: [Role.Manager],
    Component: lazy(() => import('pages/ProjectPage/ProjectPage')),
  },
  {
    index: false,
    name: 'Reports',
    href: '/reports',
    menuType: [MenuType.Main],
    role: [Role.Employee, Role.Manager],
    Component: lazy(() => import('pages/ReportPage/ReportPage')),
  },
];
