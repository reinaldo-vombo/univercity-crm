import { Resend } from 'resend';
import { serverEnv } from './env/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  email: string[],
  subject: string,
  html: any,
) => {
  const { error, data } = await resend.emails.send({
    from: serverEnv.ONBORDING,
    to: serverEnv.NODE_ENV === 'development' ? serverEnv.SUPORTE_EMAIL : email,
    subject,
    react: html,
  });
  return {
    error,
    data,
  };
};
