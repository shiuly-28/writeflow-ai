import  clientPromise  from '@/lib/mongodb';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

import bcrypt from "bcryptjs";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("ইমেইল এবং পাসওয়ার্ড দুটিই প্রয়োজন।");
        }

        const client = await clientPromise;
        const db = client.db();
        
        // ইউজার খোঁজা
        const user = await db.collection("users").findOne({ email: credentials.email });

        if (!user || !user.password) {
          throw new Error("এই ইমেইল দিয়ে কোনো ইউজার পাওয়া যায়নি।");
        }

        // পাসওয়ার্ড ম্যাচ করা
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordCorrect) {
          throw new Error("ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।");
        }

        // সেশনের জন্য ইউজার অবজেক্ট রিটার্ন করা
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      }
    })
  ],
  session: {
    strategy: "jwt", // আমরা জেডব্লিউটি (JWT) সেশন ব্যবহার করব
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // আমাদের কাস্টম লগইন পেজ পাথ
  }
});

export { handler as GET, handler as POST };



// password: 3rRCoTVzP28pOlcs