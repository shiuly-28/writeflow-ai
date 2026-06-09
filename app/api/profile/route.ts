import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/app/model/User";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, bio } = await request.json();

    if (!name?.trim()) {
      return NextResponse.json({ error: "নাম খালি রাখা যাবে না।" }, { status: 400 });
    }

    await connectDB();

    await User.findOneAndUpdate(
      { email: session.user.email },
      { name: name.trim(), bio: bio?.trim() || "" },
      { new: true }
    );

    return NextResponse.json({ message: "Profile সফলভাবে আপডেট হয়েছে!" });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}