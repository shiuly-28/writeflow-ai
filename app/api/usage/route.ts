// import connectDB from "@/lib/mongodb"; //  mongodb.ts ফাইলে আপনার মঙ্গুজ কানেকশন রয়েছে
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import Usage from "@/model/Usage"; //  আপনার ফোল্ডার স্ট্রাকচার অনুযায়ী সঠিক পাথ

// export async function GET(request: Request) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || !session.user?.email) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // ডাটাবেজ কানেক্ট করা
//     await connectDB();

//     const { searchParams } = new URL(request.url);
//     const search = searchParams.get("search") || "";

//     // মেইন কুয়েরি অবজেক্ট
//     let query: any = { userEmail: session.user.email };

//     // সার্চ টেক্সট থাকলে কন্ডিশন যোগ করা
//     if (search) {
//       query.$or = [
//         { agent: { $regex: search, $options: "i" } },
//         { prompt: { $regex: search, $options: "i" } },
//       ];
//     }

//     // মঙ্গুজ মডেল ব্যবহার করে ডেটা খোঁজা
//     const usageHistory = await Usage.find(query)
//       .sort({ createdAt: -1 }) // লেটেস্ট ডেটা আগে আসবে
//       .lean(); // পারফরম্যান্স বুস্ট করার জন্য

//     return NextResponse.json(usageHistory, { status: 200 });
//   } catch (error) {
//     console.error("Fetch usage error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }