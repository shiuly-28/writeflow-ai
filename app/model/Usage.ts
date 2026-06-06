import mongoose, { Schema, Document, Model } from "mongoose";

// ১. টাইপস্ক্রিপ্ট ইন্টারফেস তৈরি
export interface IUsage extends Document {
  userEmail: string;
  agent: string;
  prompt: string;
  tokens: number;
  createdAt: Date;
}

// ২. মঙ্গুজ স্কিমা ডিফাইন করা
const UsageSchema: Schema<IUsage> = new Schema(
  {
    userEmail: { type: String, required: true, index: true }, // index অন রাখলে দ্রুত সার্চ হবে
    agent: { type: String, required: true },
    prompt: { type: String, required: true },
    tokens: { type: Number, required: true },
  },
  { 
    timestamps: true // এটি অটোমেটিক 'createdAt' এবং 'updatedAt' তৈরি করে দেবে
  }
);

// ৩. মডেল এক্সপোর্ট করা (Next.js এর রিলোড ইস্যু হ্যান্ডেল করে)
const Usage: Model<IUsage> = mongoose.models.Usage || mongoose.model<IUsage>("Usage", UsageSchema);

export default Usage;