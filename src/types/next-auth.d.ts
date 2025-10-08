import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  export interface IUser extends DefaultUser {
    id: string;
    name: string;
    email: string;
    avatar: string;
    number: number;
    contact: any;
    role: string;
    accessToken: string;
    expiresAt: number;
  }
  interface Session {
    user?: IUser & DefaultSession['user'];
    expiresAt: any;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    user: {
      role: string;
    };
    role: string;
  }
}
