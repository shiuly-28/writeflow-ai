import mongoose from "mongoose";

declare global {
  var _mongoose: { conn: any; promise: any } | undefined;
}

const uri = process.env.MONGODB_URI as string;
if (!uri) throw new Error("MONGODB_URI নেই!");

const cached = global._mongoose || { conn: null, promise: null };
global._mongoose = cached;

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, { dbName: "writeflow-ai" });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}