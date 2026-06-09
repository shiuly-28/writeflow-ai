import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { text, action, tone } = await request.json();

    if (!text?.trim()) {
      return NextResponse.json({ error: "Text দাও।" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY নেই।" }, { status: 500 });
    }

    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    let prompt = "";

    if (action === "rewrite") {
      prompt = `Rewrite the following text in a ${tone} tone. Keep the same meaning but change the style and wording. Return only the rewritten text, nothing else.\n\nText: ${text}`;
    } else if (action === "shorten") {
      prompt = `Shorten the following text to about half its length while keeping the key points. Return only the shortened text.\n\nText: ${text}`;
    } else if (action === "expand") {
      prompt = `Expand the following text by adding more details, examples, and explanations. Make it about twice as long. Return only the expanded text.\n\nText: ${text}`;
    } else if (action === "grammar") {
      prompt = `Fix all grammar, spelling, and punctuation errors in the following text. Return only the corrected text.\n\nText: ${text}`;
    } else if (action === "clarity") {
      prompt = `Improve the clarity and readability of the following text. Make it easier to understand. Return only the improved text.\n\nText: ${text}`;
    }

    const response = await model.generateContent(prompt);
    const result = response.response.text();

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Rewrite agent error:", error);
    return NextResponse.json(
      { error: error.message || "AI error" },
      { status: 500 }
    );
  }
}