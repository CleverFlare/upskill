import type { ReactNode } from "react";
import Sidebar from "./_components/sidebar";
import Topbar from "./_components/topbar";

export default function Layout({ children }: { children: ReactNode }) {
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
