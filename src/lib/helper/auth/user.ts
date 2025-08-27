import { authOptions } from '@/config/auth';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';

export const User = () => {
  const { data: session } = useSession();
  return session?.user;
};

export const serverUser = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return user;
};
