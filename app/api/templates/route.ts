import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Doc from "@/app/model/Document";

const defaultTemplates = [
  {
    id: 1,
    title: "Blog Post Writer",
    description: "Professional blog posts with SEO optimization",
    category: "Blog",
    rating: 4.8,
    usageCount: 1240,
    tone: "Professional",
    image: "📝",
  },
  {
    id: 2,
    title: "Social Media Caption",
    description: "Engaging captions for Instagram, Facebook & Twitter",
    category: "Social Media",
    rating: 4.9,
    usageCount: 2150,
    tone: "Casual",
    image: "📱",
  },
  {
    id: 3,
    title: "Email Newsletter",
    description: "Professional email newsletters that convert",
    category: "Email",
    rating: 4.7,
    usageCount: 890,
    tone: "Friendly",
    image: "📧",
  },
  {
    id: 4,
    title: "Ad Copy Generator",
    description: "High-converting ad copy for any platform",
    category: "Ad Copy",
    rating: 4.6,
    usageCount: 670,
    tone: "Persuasive",
    image: "📢",
  },
  {
    id: 5,
    title: "Product Description",
    description: "Compelling product descriptions that sell",
    category: "Ad Copy",
    rating: 4.5,
    usageCount: 540,
    tone: "Persuasive",
    image: "🛍️",
  },
  {
    id: 6,
    title: "YouTube Script",
    description: "Engaging video scripts for YouTube content",
    category: "Blog",
    rating: 4.7,
    usageCount: 430,
    tone: "Casual",
    image: "🎬",
  },
  {
    id: 7,
    title: "LinkedIn Post",
    description: "Professional LinkedIn posts for networking",
    category: "Social Media",
    rating: 4.8,
    usageCount: 780,
    tone: "Professional",
    image: "💼",
  },
  {
    id: 8,
    title: "Cold Email",
    description: "Cold emails that get responses",
    category: "Email",
    rating: 4.4,
    usageCount: 320,
    tone: "Friendly",
    image: "✉️",
  },
];

export async function GET() {
  return NextResponse.json(defaultTemplates);
}