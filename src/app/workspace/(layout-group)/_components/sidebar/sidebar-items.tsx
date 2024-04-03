"use client";
import { Progress } from "@/components/ui/progress";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import tabs from "../tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  HiArrowRightOnRectangle,
  HiArrowUturnLeft,
  HiOutlineWindow,
} from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";
import Logo from "@/components/logo";
import TabButton from "./tab-button";

export default function SidebarItems() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  async function handleSignOut() {
    setIsLoading(true);
    await signOut({ redirect: false });
    router.refresh();
  }

  const path = usePathname();

  const pathArray = path
    .trim()
    .replace(/^\/+|\/$/g, "")
    .split("/");

  const { data: session } = useSession();

  const isAdminPath = pathArray[1] === "admin";

  const isAdmin = session?.user.role === "admin";

  return (
    <>
      <Logo />
      {!isAdminPath && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold uppercase text-gray-700 dark:text-gray-400">
            progress
          </p>
          <Progress value={50} />
        </div>
      )}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold uppercase text-gray-700 dark:text-gray-400">
          section
        </p>
        {tabs.map((tab) => (
          <TabButton {...tab} />
        ))}
      </div>
      <div className="mt-auto flex w-full flex-col gap-3">
        {!isAdminPath && isAdmin && (
          <Button variant="outline" className="w-full capitalize" asChild>
            <Link href="/workspace/admin">
              <HiOutlineWindow className="me-2" />
              Admin Panel
            </Link>
          </Button>
        )}
        <Button variant="outline" className="w-full capitalize" asChild>
          <Link href="/">
            <HiArrowUturnLeft className="me-2" />
            Back to website
          </Link>
        </Button>
        <Button
          variant="destructive"
          className="flex w-full gap-2"
          onClick={() => handleSignOut()}
          disabled={isLoading}
        >
          {!isLoading && <HiArrowRightOnRectangle />}
          {isLoading && <LuLoader2 className="animate-spin" />}
          Sign Out
        </Button>
      </div>
    </>
  );
}
