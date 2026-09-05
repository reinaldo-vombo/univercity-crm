import React from 'react';
import { CheckIcon, Spinner, XIcon } from './animated-icons';

export const STATE_CONFIG = {
  idle: {
    label: 'processar',
    icon: null,
  },
  loading: {
    label: 'A processar...',
    icon: React.createElement(Spinner),
  },
  success: {
    label: 'Operação concluído',
    icon: React.createElement(CheckIcon),
  },
  error: {
    label: 'Erro ao enviar',
    icon: React.createElement(XIcon),
  },
};
export const STATE_STYLES = {
  idle: 'bg-button text-button-text',
  loading: 'bg-button-loading text-white',
  success: 'bg-button-success text-white',
  error: 'bg-button-error text-white',
} as const;
