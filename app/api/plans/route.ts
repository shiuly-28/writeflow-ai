import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Plan from "@/app/model/Plan";

export async function GET() {
  try {
    await connectDB();
    const plans = await Plan.find({}).sort({ order: 1 }).lean();
    return NextResponse.json({ plans }, { status: 200 });
  } catch (error) {
    console.error("GET /api/plans error:", error);
    return NextResponse.json(
      { error: "প্ল্যান লোড করতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}