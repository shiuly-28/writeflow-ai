import { connectDB } from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Usage from "@/app/model/Usage";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";

    const query: any = { userEmail: session.user.email };

    if (search) {
      query.$or = [
        { agent: { $regex: search, $options: "i" } },
        { prompt: { $regex: search, $options: "i" } },
      ];
    }

    const usageHistory = await Usage.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(usageHistory, { status: 200 });
  } catch (error) {
    console.error("Fetch usage error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}