import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Sidebar from "./Sidebar";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role={(session.user as any).role} user={session.user} />
      <main className="flex-1 ml-64 p-8 bg-gray-50">{children}</main>
    </div>
  );
}