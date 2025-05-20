import { authOptions } from '../auth/config';
import api from './axios';
import { getServerSession } from 'next-auth';

// Automatically attach access token from NextAuth session
api.interceptors.request.use(async (config) => {
  const session = await getServerSession(authOptions);

  if (session?.user.accessToken) {
    config.headers.Authorization = `Bearer ${session.user.accessToken}`;
  }

  return config;
});

export default api;
