import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  TokenSet,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { env } from "@/env";
import { db } from "@/server/db";
import { type JWT } from "next-auth/jwt";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      // ...other properties
      role: "student" | "instructor" | "admin";
      username: string;
      firstName: string;
      lastName: string;
      image?: string;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    // role: "student" | "instructor" | "admin";
    // username: string;
    id: string;
    role: "student" | "instructor" | "admin";
    username: string;
    firstName: string;
    lastName: string;
    image?: string;
    // username: string;
    // password: string;
  }
}

interface Token extends JWT {
  sub?: string;
  name?: string;
  email?: string;
  picture?: string;
  user: {
    id: string;
    role: "student" | "instructor" | "admin";
    username: string;
    firstName: string;
    lastName: string;
    image?: string;
  };
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, token }) => {
      session.user = (token as Token).user;
      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return Promise.resolve(token);
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      // id: "credentials",
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "username",
          required: true,
        },
        password: {
          label: "password",
          type: "password",
          required: true,
        },
      },

      async authorize(credentials, _) {
        // Add logic here to look up the user from the credentials supplied
        console.log(credentials);
        if (!credentials) return null;
        if (
          env.ADMIN_USERNAME === credentials.username &&
          env.ADMIN_PASSWORD === credentials.password
        )
          return {
            username: "admin",
            id: 0,
            role: "admin",
            image: undefined,
            firstName: "The",
            lastName: "Admin",
          };

        try {
          const user = await db.user.findUnique({
            where: {
              username: credentials.username,
            },
          });

          if (!user) throw new Error("Invalid username");

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!isCorrectPassword) throw new Error("Invalid password");

          if (user.role === "instructor" && !user.isActive)
            throw new Error("Invalid username");

          const result = {
            username: user.username,
            id: user.id,
            role: user.role,
            image: user.image,
            firstName: user.firstName,
            lastName: user.lastName,
          };
          console.log(result);
          return result;
        } catch (err) {
          throw new Error("Invalid username");
        }
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
