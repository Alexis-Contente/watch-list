import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
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
    }),
      GitHubProvider({
        clientId: process.env.GITHUB_ID || "",
        clientSecret: process.env.GITHUB_SECRET || "",
      }),
      DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID || "",
        clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
      }),
    ],
  callbacks: {
    async jwt({token, user, account}) {
      console.log("jwt Callback", { token, user, account });

      user && (token.user = user)
      return token
  },
    async session({ session, token }) {
      console.log("Session Callback", { session, token });
      let userId: string | undefined;
      if (token) {
        userId = (token.user as any).id as string;
      }
      const newSession = {
        ...session,
        user: {
          ...session.user,
          id: userId,
        },
      };
      return newSession;
    },
    async signIn({ user, account, profile }) {
      console.log("GET /api/auth/session");

      console.log("Sign In Callback", {
        user,
        account,
        profile,
      });

      try {
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
    } catch (error) {
      console.log(error);
    return false;
    } finally {
      await prisma.$disconnect();
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

