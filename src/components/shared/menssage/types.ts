export type TChatBoxProps = {
  contact: TContact;
  messages: TMessage[];
  models?: string[];
  contactName: string;
  defaultModel?: string;
  onSendMessage?: (content: string, channel: TChannel, model: string) => void;
  className?: string;
};
export type TChannel = 'whatsapp' | 'sms' | 'email';
export type TChatComposerProps = {
  channel: TChannel;
  onChannelChange: (channel: TChannel) => void;
  contactName: string;
  history: { content: string; sender: 'me' | 'contact' }[];
  onSend: (content: string) => void;
};
export type TMessage = {
  id: string;
  content: string;
  subject?: string; // usado quando channel === "email"
  sender: 'me' | 'contact';
  channel: TChannel;
  sentAt: string | Date;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
};

export type TContact = {
  name: string;
  avatarUrl?: string;
  isOnline?: boolean;
};
