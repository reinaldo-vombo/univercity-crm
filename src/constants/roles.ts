import { ENUM_USER_ROLE } from '@/lib/enums/user';

export const ROLES = [
  {
    id: '1',
    label: 'Super_Admin',
    value: ENUM_USER_ROLE.SUPER_ADMIN,
  },
  {
    id: '2',
    label: 'Admin',
    value: ENUM_USER_ROLE.ADMIN,
  },
  {
    id: '3',
    label: 'Contablista',
    value: ENUM_USER_ROLE.ACCOUNTANT,
  },
  {
    id: '5',
    label: 'Direitor',
    value: ENUM_USER_ROLE.DEPARTMENT_HEAD,
  },
  {
    id: '6',
    label: 'Funcionario',
    value: ENUM_USER_ROLE.STAFF,
  },
];
