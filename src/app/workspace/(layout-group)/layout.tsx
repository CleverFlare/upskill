import type { ReactNode } from "react";
import Topbar from "./_components/topbar";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import Sidebar from "./_components/sidebar";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerAuthSession();
  if (!session) redirect("/");
  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-[270px_1fr] lg:grid-rows-[auto_1fr]">
      <Sidebar />
      <Topbar />
      <div className="col-start-2 row-start-2 overflow-y-auto px-4 py-4">
        {children}
      </div>
    </div>
  );
}
