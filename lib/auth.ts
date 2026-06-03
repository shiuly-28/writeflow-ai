import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("ইমেইল এবং পাসওয়ার্ড দুটিই প্রয়োজন।");
        }

        const client = await clientPromise;
        const db = client.db();

        // ১. ইমেইল দিয়ে ইউজার খুঁজুন
        const user = await db.collection("users").findOne({ email: credentials.email });

        if (!user) {
          throw new Error("এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট খুঁজে পাওয়া যায়নি।");
        }

        // ২. পাসওয়ার্ড ম্যাচ করুন (Bcrypt দিয়ে)
        const passwordMatch = await bcrypt.compare(credentials.password, user.password);

        if (!passwordMatch) {
          throw new Error("পাসওয়ার্ড সঠিক নয়।");
        }

        // ৩. সবকিছু ঠিক থাকলে ইউজার অবজেক্ট রিটার্ন করুন (যা সেশনে সেভ হবে)
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", // আমরা টোকেন বেসড সেশন ব্যবহার করছি
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // আমাদের কাস্টম লগইন পেজের পাথ
  },
};