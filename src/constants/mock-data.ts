import React from 'react';
import {
  Book,
  Building,
  Home,
  Inbox,
  User,
  BookCheck,
  BookType,
  Currency,
  BookKey,
  Building2Icon,
  AlignHorizontalJustifyEndIcon,
  UserPlus2,
  Calendar,
} from 'lucide-react';
export const END_POINTS = {
  ADMIN: '/auth/login',
  STUDENTE: '/student/login',
  FACULTY: '/faculty/login',
};
export const ROUTES = {
  DASHBOARD: '/crm',
  ADMIN_DASHBORD: '/crm/admin',
  UNAUTHORIZED: '/unauthorized',
  LOGIN_APANEL: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/apanel/login`,
  RECOVER_PASSWORD_APANEL: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/apanel/recover-password`,
  RESET_PASSWORD_APANEL: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/apanel/reset-password`,
  LOGIN_STUDENT: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/student/login`,
  RECOVER_PASSWORD_STUDENT: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/student/recover-password`,
  RESET_PASSWORD_STUDENT: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/student/reset-password`,
  ACCOUNT: `${process.env.NEXT_PUBLIC_BASE_URL}/crm/profile`,
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
        href: `${ROUTES.DASHBOARD}/admin/academic-faculty`,
        label: 'Unidade Acadêmica',
        icon: React.createElement(Book),
      },
      {
        href: `${ROUTES.DASHBOARD}/admin/departments`,
        label: 'Departamentos',
        icon: React.createElement(Building),
      },
      {
        href: `${ROUTES.DASHBOARD}/admin/admition-exames`,
        label: 'Exames de admisão',
        icon: React.createElement(Book),
      },
      {
        href: `${ROUTES.DASHBOARD}/admin/academic-semester`,
        label: 'Semestre Acadêmico',
        icon: React.createElement(BookCheck),
      },
      {
        href: `${ROUTES.DASHBOARD}/admin/courses`,
        label: 'Cursos',
        icon: React.createElement(BookType),
      },
      {
        href: `${ROUTES.DASHBOARD}/admin/courses-price`,
        label: 'Preços dos curso',
        icon: React.createElement(Currency),
      },
      {
        href: `${ROUTES.DASHBOARD}/admin/disciplines`,
        label: 'Deciplinas',
        icon: React.createElement(BookKey),
      },
      {
        href: `${ROUTES.DASHBOARD}/admin/buildings`,
        label: 'Edificios',
        icon: React.createElement(Building2Icon),
      },
      {
        href: `${ROUTES.DASHBOARD}/admin/rooms`,
        label: 'Salas',
        icon: React.createElement(AlignHorizontalJustifyEndIcon),
      },
      {
        href: `${ROUTES.DASHBOARD}/admin/faculty`,
        label: 'Professores',
        icon: React.createElement(UserPlus2),
      },
      {
        href: `${ROUTES.DASHBOARD}/events`,
        label: 'Events',
        icon: React.createElement(Calendar),
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
  sesson: [
    {
      id: '1',
      label: 'Primavera',
      value: 'Primavera',
    },
    {
      id: '2',
      label: 'Verão',
      value: 'Verão',
    },
    {
      id: '3',
      label: 'Outono',
      value: 'Outono',
    },
  ],
  months: [
    {
      id: '1',
      label: 'Janeiro',
      value: 'Janeiro',
    },
    {
      id: '2',
      label: 'Fevereiro',
      value: 'Fevereiro',
    },
    {
      id: '3',
      label: 'Março',
      value: 'Março',
    },
    {
      id: '4',
      label: 'Abril',
      value: 'Abril',
    },
    {
      id: '5',
      label: 'Maio',
      value: 'Maio',
    },
    {
      id: '6',
      label: 'Junho',
      value: 'Junho',
    },
    {
      id: '7',
      label: 'Julho',
      value: 'Julho',
    },
    {
      id: '8',
      label: 'Agosto',
      value: 'Agosto',
    },
    {
      id: '9',
      label: 'Setembro',
      value: 'Setembro',
    },
    {
      id: '10',
      label: 'Outubro',
      value: 'Outubro',
    },
    {
      id: '11',
      label: 'Novembro',
      value: 'Novembro',
    },
    {
      id: '12',
      label: 'Dezembro',
      value: 'Dezembro',
    },
  ],
  shifts: [
    {
      id: '1',
      label: 'Manhã',
      value: 'MORNING',
    },
    {
      id: '2',
      label: 'Tarde',
      value: 'AFTERNOON',
    },
    {
      id: '3',
      label: 'Noite',
      value: 'EVENING',
    },
  ],
  gender: [
    {
      id: '1',
      label: 'Masculino',
      value: 'masculino',
    },
    {
      id: '2',
      label: 'Feminino',
      value: 'feminino',
    },
  ],
  yearLevel: [
    {
      id: '1',
      label: '1',
      value: 'FIRST',
    },
    {
      id: '2',
      label: '2',
      value: 'SECOND',
    },
    {
      id: '3',
      label: '3',
      value: 'THIRD',
    },
    {
      id: '4',
      label: '4',
      value: 'FOURTH',
    },
    {
      id: '5',
      label: '5',
      value: 'FIFTH',
    },
  ],
};
export const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julhio ',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Decembro',
] as const;

export const GRADES = [
  { id: '1', label: '1', value: '1' },
  { id: '2', label: '2', value: '2' },
  { id: '3', label: '3', value: '3' },
  { id: '4', label: '4', value: '4' },
  { id: '5', label: '5', value: '5' },
  { id: '6', label: '6', value: '6' },
  { id: '7', label: '7', value: '7' },
  { id: '8', label: '8', value: '8' },
  { id: '9', label: '9', value: '9' },
  { id: '10', label: '10', value: '10' },
  { id: '11', label: '11', value: '11' },
  { id: '12', label: '12', value: '12' },
  { id: '13', label: '13', value: '13' },
  { id: '14', label: '14', value: '14' },
  { id: '15', label: '15', value: '15' },
  { id: '16', label: '16', value: '16' },
  { id: '17', label: '17', value: '17' },
  { id: '18', label: '18', value: '18' },
  { id: '19', label: '19', value: '19' },
  { id: '20', label: '20', value: '20' },
];
