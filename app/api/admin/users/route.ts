import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/app/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    // ১. চেক করুন যে লগইন করা ইউজারটি আসলেই এডমিন কিনা
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ message: "Unauthorized Access" }, { status: 401 });
    }

    // ২. ডাটাবেজ কানেক্ট করুন এবং পাসওয়ার্ড ছাড়া সব ইউজার নিয়ে আসুন
    await connectDB();
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });

    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    console.error("ADMIN USERS FETCH ERROR:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}