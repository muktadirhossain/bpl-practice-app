import NextAuth, {
  Session,
  User as NextAuthUser,
  Account,
  AuthError,
} from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

import connectDB from "./lib/connectdb";
import { authConfig } from "./auth.config";
import User from "./models/users/user.model";

import mongoClient from "@/database/mongoClientPromise";

// Extend NextAuthUser to include `role`
interface ExtendedUser extends NextAuthUser {
  role?: string;
}

// Define a type for the custom token object
interface CustomToken extends JWT {
  accessToken?: string;
  accessTokenExpires?: number;
  refreshToken?: string;
  user?: ExtendedUser;
  role?: string;
  error?: string;
}

// Define a type for the custom session object
interface CustomSession extends Session {
  accessToken?: string;
  role?: string;
  error?: string;
}

async function refreshAccessToken(token: CustomToken): Promise<CustomToken> {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID as string,
        client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
        refresh_token: token.refreshToken as string,
        grant_type: "refresh_token",
      });
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const refreshedTokens = await res.json();

    if (!res?.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens?.access_token,
      accessTokenExpires: Date.now() + refreshedTokens?.expires_in * 1000,
      refreshToken: refreshedTokens?.refresh_token,
    };
  } catch (error) {
    // console.error(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(mongoClient as MongoClient, {
    databaseName: String(process.env.DB_NAME as string),
  }),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (credentials == null) return null;
        let user = null;
        const { email, password } = credentials || {};

        try {
          connectDB();
          user = await User.findOne({ email: email });

          if (!user) {
            throw new Error("No user found with that email!!");
          }

          const isPasswordMatch = await bcrypt.compare(
            password as string,
            user?.password || "",
          );

          if (!isPasswordMatch) {
            // console.log("Password mismatch");
            throw new Error("Wrong Credentials!");
          }

          // console.log("User Logged in successfully!!!");
          return user;
        } catch (error: any) {
          throw new AuthError(error.message || "Failed to authorize user");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: ExtendedUser }) {
      // console.log(user?.email);
      // Check if user exists in your database
      connectDB();
      const userExists = await User.find({ email: user?.email });

      // console.log(userExists);
      if (!!userExists) {
        return true;
      } else {
        // Optionally, you can create the user in your database here
        // console.log("User not existing.... ");
        // console.log("Insert new User");
        await User.create(user);

        // or handle the case where the user does not exist
        return false;
      }
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: CustomToken;
      user?: ExtendedUser;
      account?: Account;
    }) {
      // console.log(`Token:${JSON.stringify(token)}`);
      // console.log(`Account:${JSON.stringify(account)}`);
      // console.log(`User:${JSON.stringify(user)}`);
      if (account && user) {
        // console.log("Account",account)
        return {
          accessToken: account?.access_token,
          accessTokenExpires: Date.now() + (account.expires_in || 0) * 1000,
          refreshToken: account?.refresh_token,
          role: user?.role || "user",
          user,
        };
      }

      if (Date.now() < (token?.accessTokenExpires || 0)) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({
      session,
      token,
    }: {
      session: CustomSession;
      token: CustomToken;
    }) {
      session.user = token?.user;
      session.accessToken = token?.accessToken;
      session.role = token?.role;
      session.error = token?.error;

      // console.log(`Returning session:${JSON.stringify(session)}`);

      return session;
    },
  },
});
