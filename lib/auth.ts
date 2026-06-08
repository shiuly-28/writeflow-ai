import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import User from "@/app/model/User";

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
        const inputEmail = credentials.email.toLowerCase();

        if (inputEmail === "admin@writeflow.com" && credentials.password === "123456") {
          return { id: "demo-admin", name: "Demo Admin", email: "admin@writeflow.com", role: "admin" } as any;
        }
        if (inputEmail === "user@writeflow.com" && credentials.password === "123456") {
          return { id: "demo-user", name: "Demo User", email: "user@writeflow.com", role: "user" } as any;
        }

        try {
          await connectDB();
          const user = await User.findOne({ email: inputEmail });
          if (!user) return null;
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) return null;
          return { id: user._id.toString(), name: user.name, email: user.email, role: user.role || "user" } as any;
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
      if (session.user) (session.user as any).role = token.role;
      return session;
    },
  },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};