import NextAuth, { DefaultSession } from 'next-auth';


declare module 'next-auth' {
  interface Session {
    session: {
      user: {
        id: string;
        name: string;
        email: string;
        image: string | null;
      } & DefaultSession['user'];
    };
  }
}