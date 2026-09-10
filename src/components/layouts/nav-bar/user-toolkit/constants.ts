import { ROUTES } from '@/constants/routes';
import {
  LucideIcon,
  CircleUserRound,
  CreditCard,
  ReceiptText,
  Settings,
  LogOut,
  Users,
  Info,
  Home,
} from 'lucide-react';

type MenuItem = {
  label: string;
  icon: LucideIcon;
  destructive?: boolean;
  route: string;
};

export const PROFILE_ITEMS: MenuItem[] = [
  { label: 'Perfil', icon: CircleUserRound, route: ROUTES.PROFILE },
  { label: 'Configurações', icon: Settings, route: ROUTES.SETTINGS },
  { label: 'Contas Bancarias', icon: CreditCard, route: ROUTES.BANK_ACCOUNTS },
  { label: 'Actividade', icon: ReceiptText, route: ROUTES.AUDI_LOGS },
  { label: 'Útilizadores', icon: Users, route: ROUTES.USERS },
];

export const SETTINGS_ITEMS: MenuItem[] = [
  { label: 'Secretaria', icon: Settings, route: ROUTES.SECRETARY },
  { label: 'Univercidade', icon: Home, route: ROUTES.RULES_SETTINGS },
  { label: 'Suporte', icon: Info, route: ROUTES.SUPORTE },
];

export const LOGOUT_ITEM: MenuItem = {
  label: 'Signout',
  icon: LogOut,
  destructive: true,
  route: ROUTES.SUPORTE,
};

export const itemClass =
  'p-2 text-sm font-medium text-popover-foreground cursor-pointer gap-2';
