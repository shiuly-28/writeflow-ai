import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const { topic, tone, audience, contentType } = await request.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API Key is missing in .env.local" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenerativeAI(apiKey);

    // 💡 জেমিনিকে প্রম্পটে বলে দেওয়া হয়েছে যেন সে টাইটেল জেনারেট না করে
    const finalPrompt = `
      You are an expert AI content generator. 
      Generate content based on the following specifications:
      - Topic/Keywords: ${topic}
      - Content Type: ${contentType}
      - Target Audience: ${audience || 'General public'}
      - Tone: ${tone || 'Professional'}

      You must respond ONLY with a valid JSON object matching this TypeScript structure:
      {
        "meta": "An SEO-friendly meta description (max 160 characters)",
        "tags": "Comma-separated SEO tags",
        "content": "The actual full generated content based on the topic. Use good formatting, line breaks, and detailed paragraphs."
      }

      Do not include markdown code blocks like \`\`\`json ... \`\`\` in your response. Return pure JSON text.
    `;

    const model = ai.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });
    
    const response = await model.generateContent(finalPrompt);
    const rawText = response.response.text();
    const cleanData = JSON.parse(rawText);

    // 💡 এখানে 'title' এর জায়গায় সরাসরি আপনার পাঠানো 'topic' ভেরিয়েবলটি বসিয়ে দেওয়া হলো
    return NextResponse.json({
      title: topic, // জেমিনির টাইটেল না নিয়ে সরাসরি আপনার লেখা টপিকটি পাঠানো হলো
      meta: cleanData.meta || "No description generated.",
      tags: cleanData.tags || "content, draft",
      content: cleanData.content || "No content was generated.",
      tokens: Math.round(rawText.length / 4)
    });

  } catch (error: any) {
    console.error("Gemini Structure Draft Error:", error);
    return NextResponse.json(
      { error: error.message || "AI Content Generation Failed" }, 
      { status: 500 }
    );
  }
}