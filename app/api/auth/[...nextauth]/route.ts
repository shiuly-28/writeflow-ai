import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // ডেমো অ্যাডমিন লগইন
        if (
          credentials.email === "admin@writeflow.com" &&
          credentials.password === "123456"
        ) {
          return {
            id: "demo-admin",
            name: "Demo Admin",
            email: "admin@writeflow.com",
            role: "admin",
          };
        }

        // ডেমো ইউজার লগইন
        if (
          credentials.email === "user@writeflow.com" &&
          credentials.password === "123456"
        ) {
          return {
            id: "demo-user",
            name: "Demo User",
            email: "user@writeflow.com",
            role: "user",
          };
        }

        // MongoDB থেকে real user চেক করো
        try {
          const client = await clientPromise;
          const db = client.db();

          const user = await db
            .collection("users")
            .findOne({ email: credentials.email });

          if (!user) return null;

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) return null;

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role || "user",
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role || "user";
      return token;
    },
    async session({ session, token }) {
      (session.user as any).role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };