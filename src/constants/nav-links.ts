import React from 'react';
import {
  Book,
  Building,
  Home,
  User,
  BookCheck,
  BookType,
  Currency,
  BookKey,
  Building2Icon,
  AlignHorizontalJustifyEndIcon,
  UserPlus2,
  Calendar,
  Receipt,
  ReceiptText,
  Activity,
  BookCopy,
  Archive,
  Rows4,
  BookMarked,
} from 'lucide-react';

export const LINKS_BY_ROLE = {
  super_admin: [
    {
      href: `/crm/admin`,
      label: 'Admin Dashboard',
      icon: React.createElement(Home, { className: 'text-neutral-500' }),
    },
    {
      href: `/crm/admin/academic-faculty`,
      label: 'Unidade Acadêmica',
      icon: React.createElement(Book),
    },
    {
      href: `/crm/admin/departments`,
      label: 'Departamentos Acadêmico',
      icon: React.createElement(Building),
    },
    {
      href: `/crm/admin/admition-exames`,
      label: 'Exames de admisão',
      icon: React.createElement(Book),
    },
    {
      href: `/crm/admin/academic-semester`,
      label: 'Semestre Acadêmico',
      icon: React.createElement(BookCheck),
    },
    {
      href: `/crm/admin/semester-registration`,
      label: 'Registro Semestral',
      icon: React.createElement(BookCopy),
    },
    {
      href: `/crm/admin/courses`,
      label: 'Cursos Acadêmico',
      icon: React.createElement(BookType),
    },
    {
      href: `/crm/admin/price-managemente`,
      label: 'Preços Acadêmico',
      icon: React.createElement(Currency),
    },
    {
      href: `/crm/admin/disciplines`,
      label: 'Deciplinas Acadêmico',
      icon: React.createElement(BookKey),
    },
    {
      href: `/crm/admin/offered-course`,
      label: 'Cadeiras Semestrais',
      icon: React.createElement(Archive),
    },
    {
      href: `/crm/admin/course-section`,
      label: 'Turmas',
      icon: React.createElement(Rows4),
    },
    {
      href: `/crm/admin/class-schedule`,
      label: 'Horarios',
      icon: React.createElement(BookMarked),
    },
    {
      href: `/crm/admin/buildings`,
      label: 'Edificios',
      icon: React.createElement(Building2Icon),
    },
    {
      href: `/crm/admin/rooms`,
      label: 'Salas',
      icon: React.createElement(AlignHorizontalJustifyEndIcon),
    },
    {
      href: `/crm/admin/faculty`,
      label: 'Professores',
      icon: React.createElement(UserPlus2),
    },
    {
      href: `/crm/admin/student`,
      label: 'Estudeantes',
      icon: React.createElement(UserPlus2),
    },
    {
      href: `/crm/management/calendar`,
      label: 'Events',
      icon: React.createElement(Calendar),
    },
    {
      href: `/crm/finance`,
      label: 'Orçamentos',
      icon: React.createElement(Receipt),
    },
    {
      href: `/crm/finance/payments`,
      label: 'Pagamentos',
      icon: React.createElement(ReceiptText),
    },
  ],
  admin: [
    {
      href: `/crm/admin`,
      label: 'Admin Dashboard',
      icon: React.createElement(Home),
    },
    {
      href: `/crm/admin/users`,
      label: 'Útilizadores',
      icon: React.createElement(User),
    },
    {
      href: `/crm/admin/activitys`,
      label: 'Registo de actividade',
      icon: React.createElement(Activity),
    },
    {
      href: `/crm/admin/academic-faculty`,
      label: 'Unidade Acadêmica',
      icon: React.createElement(Book),
    },
    {
      href: `/crm/admin/departments`,
      label: 'Departamentos Acadêmico',
      icon: React.createElement(Building),
    },
    {
      href: `/crm/admin/admition-exames`,
      label: 'Exames de admisão',
      icon: React.createElement(Book),
    },
    {
      href: `/crm/admin/academic-semester`,
      label: 'Semestre Acadêmico',
      icon: React.createElement(BookCheck),
    },
    {
      href: `/crm/admin/courses`,
      label: 'Cursos Acadêmico',
      icon: React.createElement(BookType),
    },
    {
      href: `/crm/admin/courses-price`,
      label: 'Preços dos curso',
      icon: React.createElement(Currency),
    },
    {
      href: `/crm/admin/disciplines`,
      label: 'Deciplinas Acadêmico',
      icon: React.createElement(BookKey),
    },
    {
      href: `/crm/admin/buildings`,
      label: 'Edificios',
      icon: React.createElement(Building2Icon),
    },
    {
      href: `/crm/admin/rooms`,
      label: 'Salas',
      icon: React.createElement(AlignHorizontalJustifyEndIcon),
    },
    {
      href: `/crm/admin/faculty`,
      label: 'Professores',
      icon: React.createElement(UserPlus2),
    },
    {
      href: `/crm/admin/student`,
      label: 'Estudeantes',
      icon: React.createElement(UserPlus2),
    },
    {
      href: `/crm/management/calendar`,
      label: 'Events',
      icon: React.createElement(Calendar),
    },
    {
      href: `/crm/finance`,
      label: 'Orçamentos',
      icon: React.createElement(Receipt),
    },
  ],
  manager: [
    {
      href: `/crm/management`,
      label: 'Gereniador',
      icon: React.createElement(Home, { className: 'text-green-500' }),
    },
    {
      href: `/crm/admin/academic-faculty`,
      label: 'Unidade Acadêmica',
      icon: React.createElement(Book),
    },
    {
      href: `/crm/admin/departments`,
      label: 'Departamentos Acadêmico',
      icon: React.createElement(Building),
    },
    {
      href: `/crm/admin/admition-exames`,
      label: 'Exames de admisão',
      icon: React.createElement(Book),
    },
    {
      href: `/crm/admin/academic-semester`,
      label: 'Semestre Acadêmico',
      icon: React.createElement(BookCheck),
    },
    {
      href: `/crm/admin/courses`,
      label: 'Cursos Acadêmico',
      icon: React.createElement(BookType),
    },
    {
      href: `/crm/admin/courses-price`,
      label: 'Preços dos curso',
      icon: React.createElement(Currency),
    },
    {
      href: `/crm/admin/disciplines`,
      label: 'Deciplinas Acadêmico',
      icon: React.createElement(BookKey),
    },
    {
      href: `/crm/admin/buildings`,
      label: 'Edificios',
      icon: React.createElement(Building2Icon),
    },
    {
      href: `/crm/admin/rooms`,
      label: 'Salas',
      icon: React.createElement(AlignHorizontalJustifyEndIcon),
    },
    {
      href: `/crm/admin/faculty`,
      label: 'Professores',
      icon: React.createElement(UserPlus2),
    },
    {
      href: `/crm/admin/student`,
      label: 'Estudeantes',
      icon: React.createElement(UserPlus2),
    },
    {
      href: `/crm/management/calendar`,
      label: 'Eventos',
      icon: React.createElement(Calendar),
    },
  ],
  editor: [
    {
      href: `/crm/management`,
      label: 'Editor',
      icon: React.createElement(Home, { className: 'text-green-500' }),
    },
    {
      href: `/crm/admin/academic-faculty`,
      label: 'Unidade Acadêmica',
      icon: React.createElement(Book),
    },
    {
      href: `/crm/admin/departments`,
      label: 'Departamentos Acadêmico',
      icon: React.createElement(Building),
    },
    {
      href: `/crm/admin/admition-exames`,
      label: 'Exames de admisão',
      icon: React.createElement(Book),
    },
    {
      href: `/crm/admin/academic-semester`,
      label: 'Semestre Acadêmico',
      icon: React.createElement(BookCheck),
    },
    {
      href: `/crm/admin/courses`,
      label: 'Cursos Acadêmico',
      icon: React.createElement(BookType),
    },
    {
      href: `/crm/admin/courses-price`,
      label: 'Preços dos curso',
      icon: React.createElement(Currency),
    },
    {
      href: `/crm/admin/disciplines`,
      label: 'Deciplinas Acadêmico',
      icon: React.createElement(BookKey),
    },
    {
      href: `/crm/admin/buildings`,
      label: 'Edificios',
      icon: React.createElement(Building2Icon),
    },
    {
      href: `/crm/admin/rooms`,
      label: 'Salas',
      icon: React.createElement(AlignHorizontalJustifyEndIcon),
    },
    {
      href: `/crm/admin/faculty`,
      label: 'Professores',
      icon: React.createElement(UserPlus2),
    },
    {
      href: `/crm/admin/student`,
      label: 'Estudeantes',
      icon: React.createElement(UserPlus2),
    },
    {
      href: `/crm/management/calendar`,
      label: 'Eventos',
      icon: React.createElement(Calendar),
    },
  ],
};
