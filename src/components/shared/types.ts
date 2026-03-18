import { JSX, ReactNode, ReactSVGElement } from 'react';

export type TSheetProps = {
  children: React.ReactNode;
  id?: any;
  trigger: ReactNode;
  side: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  triggerStyle?: string;
  title: string;
  description?: string;
  url?: string;
};

export type TCardProps = {
  title: string;
  description: string;
  contente: ReactNode;
  footer: string;
};

export type TAvatarProps = {
  name: string;
  photo?: string;
  className?: string;
};
export type TSelectPros = {
  placeholder: string;
  disabled?: boolean;
  className?: string;
  options: {
    id: string | number;
    label: string | number;
    value: any;
  }[];
  formField: any;
};
export type TTabsNav = {
  tabList: {
    id: string;
    lable: string;
    value: string;
    tabContent: JSX.Element;
    description: string;
  }[];
  defaultValue: string;
};
export type DropdownMenuProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  userId?: string;
  className?: string;
  lable: string;
  showLogOut?: boolean;
  variante?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
};
export type TAlertProps = {
  trigger: any;
  disabled?: boolean;
  description?: string;
  action: () => void;
};
export type TExportDocProps<T extends object> = {
  data: T[];
  filename?: string;
  // headers?: Record<keyof T, string>;
  headers?: any;
};
export type TPopoverForm = {
  title: string;
  icon?: ReactSVGElement;
};
