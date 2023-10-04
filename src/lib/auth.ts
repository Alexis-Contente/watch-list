import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

      // Vérif user exist
      const userExist = await prisma.user.findFirst({
        where: {
          email: user.email as string,
        },
      });

      // If exist, update user
      if (userExist) {
        await prisma.user.update({
          where: {
            id: userExist.id,
          },
          data: {
            email: user.email as string,
            name: user.name as string,
            image: user.image as string,
          },
        });
      } else {
        // If not exist, create user
        await prisma.user.create({
          data: {
            id: user.id as string,
            email: user.email as string,
            name: user.name as string,
            image: user.image as string,
          },
        });
      }

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