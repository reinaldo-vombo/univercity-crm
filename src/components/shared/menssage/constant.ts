import { Mail, MessageCircle, MessageSquareText } from 'lucide-react';
import { TChannel } from './types';

export const CHANNEL_CONFIG: Record<
  TChannel,
  { label: string; icon: React.ElementType; accent: string; text: string }
> = {
  whatsapp: {
    label: 'WhatsApp',
    icon: MessageCircle,
    accent: 'bg-emerald-500 hover:bg-emerald-600',
    text: 'text-emerald-600 dark:text-emerald-400',
  },
  sms: {
    label: 'SMS',
    icon: MessageSquareText,
    accent: 'bg-blue-500 hover:bg-blue-600',
    text: 'text-blue-600 dark:text-blue-400',
  },
  email: {
    label: 'Email',
    icon: Mail,
    accent: 'bg-indigo-500 hover:bg-indigo-600',
    text: 'text-indigo-600 dark:text-indigo-400',
  },
};
