import { ReactNode } from 'react';

export type TSheetProps = {
  children: React.ReactNode;
  trigger: ReactNode;
  side: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  triggerStyle?: string;
  title: string;
  description?: string;
};

export type TCardProps = {
  title: string;
  description: string;
  contente: ReactNode;
  footer: string;
};

export type TAvatarProps = {
  name: string;
  photo: string;
  className?: string;
};
export type TSelectPros = {
  placeholder: string;
  className: string;
  options: {
    id: string;
    label: string;
    value: string;
  }[];
  formField: any;
};

export type DropdownMenuProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
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
