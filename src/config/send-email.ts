import { Resend } from 'resend';
import { serverEnv } from './env/server';
import { ReactElement } from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  email: string[],
  subject: string,
  html: ReactElement,
) => {
  const { error, data } = await resend.emails.send({
    from: serverEnv.ONBORDING,
    to: email,
    subject,
    react: html,
  });
  return {
    error,
    data,
  };
};
