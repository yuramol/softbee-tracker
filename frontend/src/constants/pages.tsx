import { lazy } from 'react';

// Public Pages
export const publicPages = [
  {
    index: true,
    name: 'Login',
    href: '/login',
    mainMenu: true,
    Component: lazy(() => import('../pages/LoginPage')),
  },
  {
    index: false,
    name: 'Register',
    href: '/register',
    mainMenu: true,
    Component: lazy(() => import('../pages/LoginPage')),
  },
];

// Employee Pages
export const employeePages = [
  {
    index: true,
    name: 'Tracker',
    href: '/',
    mainMenu: true,
    Component: lazy(() => import('../pages/HomePage')),
  },
  {
    index: false,
    name: 'Profile',
    href: '/profile',
    mainMenu: false,
    Component: lazy(() => import('../pages/ProfilePage')),
  },
];

// Manager Pages
export const managerPages = [
  {
    index: true,
    name: 'Tracker',
    href: '/',
    mainMenu: true,
    Component: lazy(() => import('../pages/HomePage')),
  },
  {
    index: false,
    name: 'Profile',
    href: '/profile',
    mainMenu: false,
    Component: lazy(() => import('../pages/ProfilePage')),
  },
  {
    index: false,
    name: 'Projects',
    href: '/projects',
    mainMenu: true,
    Component: lazy(() => import('../pages/ProjectPage')),
  },
  {
    index: false,
    name: 'Reports',
    href: '/reports',
    mainMenu: true,
    Component: lazy(() => import('../pages/ReportPage')),
  },
];
