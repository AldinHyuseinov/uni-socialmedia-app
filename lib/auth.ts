import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { username } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  advanced: {
    trustedProxyHeaders: true,
  },

  database: prismaAdapter(prisma, {
    provider: "sqlserver",
  }),

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (!user.username) {
            const baseName = user.email.split("@")[0];
            const randomNum = Math.floor(Math.random() * 100000);

            user.username = `${baseName}_${randomNum}`;
          }

          return { data: user };
        },
      },
    },
  },

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      maxAge: 60, // 1 minute
    },
  },
  plugins: [username(), nextCookies()],
  disabledPaths: ["/is-username-available"],
});
