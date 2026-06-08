import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/app/dashboard/Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if ((session.user as any).role !== "admin") redirect("/dashboard");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="admin" user={session.user} />
      <main className="flex-1 ml-60 p-8 bg-gray-50">{children}</main>
    </div>
  );
}