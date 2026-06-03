import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // ডেভেলপমেন্ট মোডে গ্লোবাল ভ্যারিয়েবল ব্যবহার করা হয় যাতে হরাইজন্টাল রিলোডে বারবার কানেকশন রি-ওপেন না হয়
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // প্রোডাকশন মোডে গ্লোবাল ভ্যারিয়েবল ব্যবহার না করাই ভালো
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// ডিফল্ট এক্সপোর্ট হিসেবে ক্লায়েন্ট প্রমিজ পাঠানো হচ্ছে
export default clientPromise;