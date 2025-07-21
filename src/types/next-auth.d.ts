import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: IUser & DefaultSession['user'];
  }

  export interface IUser {
    id: string;
    name: string;
    email: string;
    avatar: string;
    number: number;
    role: string;
    accessToken: string;
    expiresAt: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}
