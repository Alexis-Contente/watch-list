import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    session: {
      user: {
        name: string;
        email: string;
        image: string | null;
      } & DefaultSession['user'];
    };
  }
}