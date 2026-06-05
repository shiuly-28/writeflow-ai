import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "./Provider"; // 💡 আপনার তৈরি করা AuthProvider ইম্পোর্ট করুন
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WriteFlow AI — SaaS Content Workspace",
  description: "Plan, generate, review, and publish content autonomously.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* 🔐 গ্লোবাল লেভেলে প্রোভাইডার সেট করা হলো যাতে সব পেজ ও নেভবার সেশন পায় */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}