import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/app/model/User";
import { connectDB } from "@/lib/mongodb"; // 💡 ইম্পোর্ট একদম নিশ্চিত করা হলো

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
        const inputPassword = credentials.password;

        // ১. ডেমো Admin চ্যাকিং
        if (inputEmail === "admin@writeflow.com" && inputPassword === "123456") {
          return { id: "demo-admin", name: "Demo Admin", email: "admin@writeflow.com", role: "admin" };
        }

        // ২. ডেমো User চ্যাকিং
        if (inputEmail === "user@writeflow.com" && inputPassword === "123456") {
          return { id: "demo-user", name: "Demo User", email: "user@writeflow.com", role: "user" };
        }

        // ৩. MongoDB real user লজিক
        try {
          await connectDB();
          const user = await User.findOne({ email: inputEmail }).lean();
          
          // ইউজার বা ইউজারের পাসওয়ার্ড ডাটাবেজে না থাকলে সরাসরি রিটার্ন
          if (!user || !user.password) return null;

          // ৪. টাইপস্ক্রিপ্টকে গ্যারান্টি দেওয়া (as string ব্যবহার করে) 🎉
          const isValid = await bcrypt.compare(inputPassword, user.password as string);
          if (!isValid) return null;

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: (user as any).role || "user",
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
      if (user) {
        token.role = (user as any).role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };