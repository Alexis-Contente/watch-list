import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
    error: "auth/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      console.log("Session Callback", { session, token });

      return session;
    },
    async signIn({ user, account, profile }) {
      console.log("GET /api/auth/session", "passla");

      console.log("Sign In Callback", {
        user,
        account,
        profile,
      });

      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect Callback", { url, baseUrl });
      // Allows relative callback URLs
      return "/";
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};