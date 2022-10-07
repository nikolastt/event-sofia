import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";

import { firebaseConfig } from "../../../services/firebase";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string) || "",
      clientSecret:
        (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string) || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  adapter: FirestoreAdapter(firebaseConfig),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        id: user.id,
      };
    },
  },
};

export default NextAuth(authOptions);
