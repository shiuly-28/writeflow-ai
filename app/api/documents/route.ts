import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Doc from "@/app/model/Document";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";

    const query: any = { userEmail: session.user.email };

    if (status !== "all") query.status = status;
    if (search) query.title = { $regex: search, $options: "i" };

    const documents = await Doc.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(documents);
  } catch (error) {
    console.error("Documents fetch error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}