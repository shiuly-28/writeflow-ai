import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDocument extends Document {
  title: string;
  content: string;
  contentType: "Blog Post" | "Social Media" | "Email";
  status: "draft" | "published" | "archived";
  words: number;
  tone: string;
  tags: string;
  meta: string;
  userEmail: string;
  tokens: number;
}

const DocumentSchema = new Schema<IDocument>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    contentType: { type: String, enum: ["Blog Post", "Social Media", "Email"], default: "Blog Post" },
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
    words: { type: Number, default: 0 },
    tone: { type: String, default: "" },
    tags: { type: String, default: "" },
    meta: { type: String, default: "" },
    userEmail: { type: String, required: true },
    tokens: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Doc: Model<IDocument> =
  mongoose.models.Document || mongoose.model<IDocument>("Document", DocumentSchema);

export default Doc;