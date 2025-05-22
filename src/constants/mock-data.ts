import React from 'react';
import { Book, Building, Home, Inbox, User } from 'lucide-react';
export const END_POINTS = {
  ADMIN: '/auth/login',
  STUDENTE: '/student/login',
  FACULTY: '/faculty/login',
};
export const ROUTES = {
  DASHBOARD: '/crm',
  LOGIN_APANEL: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/apanel/login`,
  RECOVER_PASSWORD_APANEL: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/apanel/recover-password`,
  RESET_PASSWORD_APANEL: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/apanel/reset-password`,
  LOGIN_STUDENT: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/student/login`,
  RECOVER_PASSWORD_STUDENT: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/student/recover-password`,
  RESET_PASSWORD_STUDENT: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/student/reset-password`,
  ACCOUNT: `${process.env.NEXT_PUBLIC_BASE_URL}/crm/account`,
  SETTINGS: `${process.env.NEXT_PUBLIC_BASE_URL}/crm/settings`,
};
export const DUMMY_DATA = {
  linksByRole: {
    super_admin: [
      {
        href: `${ROUTES.DASHBOARD}/admin`,
        label: 'Admin Dashboard',
        icon: React.createElement(Home),
      },
      {
        href: `${ROUTES.DASHBOARD}/admin/users`,
        label: 'Útilizadores',
        icon: React.createElement(User),
      },
      {
        href: `${ROUTES.DASHBOARD}/admin/departments`,
        label: 'Departamentos',
        icon: React.createElement(Building),
      },
      {
        href: `${ROUTES.DASHBOARD}/admin/curses`,
        label: 'Cursos',
        icon: React.createElement(Book),
      },
    ],
    admin: [
      {
        href: `${ROUTES.DASHBOARD}/admin`,
        label: 'Admin Dashboard',
        icon: React.createElement(Home),
      },
      {
        href: `${ROUTES.DASHBOARD}/admin/users`,
        label: 'Manage Users',
        icon: React.createElement(User),
      },
    ],
    student: [
      {
        href: `${ROUTES.DASHBOARD}/student`,
        label: 'Student Dashboard',
        icon: React.createElement(Home),
      },
      {
        href: `${ROUTES.DASHBOARD}/student/courses`,
        label: 'My Courses',
        icon: React.createElement(Inbox),
      },
    ],
    faculty: [
      {
        href: `${ROUTES.DASHBOARD}/faculty`,
        label: 'Faculty Dashboard',
        icon: React.createElement(Home),
      },
      {
        href: `${ROUTES.DASHBOARD}/faculty/classes`,
        label: 'Manage Classes',
        icon: React.createElement(Inbox),
      },
    ],
  },
  roles: [
    {
      id: '1',
      label: 'Super_Admin',
      value: 'super_admin',
    },
    {
      id: '2',
      label: 'Admin',
      value: 'admin',
    },
    {
      id: '3',
      label: 'Contablista',
      value: 'accountant',
    },
    {
      id: '4',
      label: 'Editor',
      value: 'editor',
    },
    {
      id: '5',
      label: 'Direitor',
      value: 'department_head',
    },
    {
      id: '6',
      label: 'Funcionario',
      value: 'staff',
    },
  ],
};
