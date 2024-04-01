import type { ReactNode } from "react";
import Sidebar from "./_components/sidebar";
import Topbar from "./_components/topbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession();

  if (!session) redirect("/");

  return (
    <div className="grid h-screen grid-cols-[270px_1fr] grid-rows-[auto_1fr]">
      <Sidebar />
      <Topbar />
      <div className="col-start-2 row-start-2 overflow-y-auto px-4 py-4">
        {children}
      </div>
    </div>
  );
}
