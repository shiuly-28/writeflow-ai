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

    const { messages, documentContext } = await request.json();

    if (!messages?.length) {
      return NextResponse.json({ error: "Message দাও।" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY নেই।" }, { status: 500 });
    }

    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `You are a helpful AI writing assistant for WriteFlow AI platform. 
You help users with content writing, brainstorming, outlines, and writing tips.
${documentContext ? `Current document context: ${documentContext}` : ""}
Be concise, helpful, and friendly. Answer in the same language the user writes in.`;

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "I'm your AI writing assistant! How can I help you today?" }],
        },
        ...messages.slice(0, -1).map((msg: any) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      ],
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = result.response.text();

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error("Chat agent error:", error);
    return NextResponse.json(
      { error: error.message || "AI error" },
      { status: 500 }
    );
  }
}