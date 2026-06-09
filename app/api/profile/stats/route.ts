import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Doc from "@/app/model/Document";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const email = session.user.email;

    const totalDocuments = await Doc.countDocuments({ userEmail: email });
    const totalTokens = await Doc.aggregate([
      { $match: { userEmail: email } },
      { $group: { _id: null, total: { $sum: "$tokens" } } },
    ]);

    return NextResponse.json({
      documents: totalDocuments,
      aiCalls: totalTokens[0]?.total || 0,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}