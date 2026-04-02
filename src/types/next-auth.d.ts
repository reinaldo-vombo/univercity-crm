import 'next-auth';
import 'next-auth/jwt';
declare module 'next-auth' {
  interface User {
    id: string;
    role: string;
    avatar?: string;
    contact: {
      phone: number;
      location: string;
    };
    number: number;
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      contact: {
        phone: number;
        location: string;
      };
      number: number;
      avatar?: string;
      refreshToken: string;
      accessToken: string;
    };
    accessToken: string;
    error?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    avatar?: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiry: number;
    error?: string;
  }
}
