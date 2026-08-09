import React from 'react';
import { CheckIcon, Spinner, XIcon } from './animated-icons';

export const STATE_CONFIG = {
  idle: {
    label: 'processar',
    bg: 'bg-white',
    text: 'text-[#0D0D0D]',
    icon: null,
  },
  loading: {
    label: 'A processar...',
    bg: 'bg-orange-500',
    text: 'text-white',
    icon: React.createElement(Spinner),
  },
  success: {
    label: 'Operação concluído',
    bg: 'bg-emerald-500',
    text: 'text-white',
    icon: React.createElement(CheckIcon),
  },
  error: {
    label: 'Erro ao enviar',
    bg: 'bg-red-500',
    text: 'text-white',
    icon: React.createElement(XIcon),
  },
};
