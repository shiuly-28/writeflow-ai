import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/app/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "সবগুলো ফিল্ড পূরণ করুন।" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ message: "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।" }, { status: 400 });
    }

    await connectDB();

    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json({ message: "এই ইমেইলটি দিয়ে অলরেডি অ্যাকাউন্ট খোলা আছে।" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: "user",
      plan: "free",
      bio: "",
      isActive: true,
    });

    return NextResponse.json({ message: "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!" }, { status: 201 });
  } catch (error: any) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}