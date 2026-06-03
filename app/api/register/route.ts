import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "সবগুলো ফিল্ড পূরণ করুন।" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(); // আপনার MONGODB_URI তে থাকা ডিফল্ট DB কানেক্ট হবে

    // ইউজার অলরেডি আছে কি না চেক করুন
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "এই ইমেইলটি দিয়ে অলরেডি অ্যাকাউন্ট খোলা আছে।" }, { status: 400 });
    }

    // পাসওয়ার্ড হ্যাশ করা
    const hashedPassword = await bcrypt.hash(password, 10);

    // নতুন ইউজার ডাটাবেজে ইনসার্ট করা
    const newUser = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}