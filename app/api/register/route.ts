import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "সবগুলো ফিল্ড পূরণ করুন।" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "এই ইমেইলটি দিয়ে অলরেডি অ্যাকাউন্ট খোলা আছে।" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role: "user",
      plan: "free",
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!" },
      { status: 201 }
    );
 } catch (error) {
    console.error("REGISTER ERROR:", error); // এটা যোগ করো
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}