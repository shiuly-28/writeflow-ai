import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Doc from "@/app/model/Document";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { topic, tone, audience, contentType } = await request.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY নেই .env.local এ" }, { status: 500 });
    }

    const ai = new GoogleGenerativeAI(apiKey);

    const finalPrompt = `
      You are an expert AI content generator. 
      Generate content based on the following specifications:
      - Topic/Keywords: ${topic}
      - Content Type: ${contentType}
      - Target Audience: ${audience || "General public"}
      - Tone: ${tone || "Professional"}

      You must respond ONLY with a valid JSON object:
      {
        "meta": "An SEO-friendly meta description (max 160 characters)",
        "tags": "Comma-separated SEO tags",
        "content": "The actual full generated content. Use good formatting, line breaks, and detailed paragraphs."
      }

      Do not include markdown code blocks. Return pure JSON text only.
    `;

    const model = ai.getGenerativeModel({
  model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const response = await model.generateContent(finalPrompt);
    const rawText = response.response.text();
    const cleanData = JSON.parse(rawText);

    const content = cleanData.content || "No content was generated.";
    const wordCount = content.split(" ").length;
    const tokens = Math.round(rawText.length / 4);

    // MongoDB তে save করো
    await connectDB();
    await Doc.create({
      title: topic,
      content,
      contentType,
      status: "draft",
      words: wordCount,
      tone: tone || "Professional",
      tags: cleanData.tags || "",
      meta: cleanData.meta || "",
      userEmail: session.user.email,
      tokens,
    });

    return NextResponse.json({
      title: topic,
      meta: cleanData.meta || "",
      tags: cleanData.tags || "",
      content,
      tokens,
    });
  } catch (error: any) {
    console.error("Draft agent error:", error);
    return NextResponse.json(
      { error: error.message || "AI Content Generation Failed" },
      { status: 500 }
    );
  }
}