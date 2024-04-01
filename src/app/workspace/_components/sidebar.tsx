"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  HiArrowRightOnRectangle,
  HiArrowUturnLeft,
  HiBars3,
  HiHome,
  HiOutlineMegaphone,
} from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

function SidebarItems() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  async function handleSignOut() {
    await signOut({ redirect: false });
    router.refresh();
  }
  return (
    <>
      <Logo />
      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold uppercase text-gray-700 dark:text-gray-400">
          progress
        </p>
        <Progress value={50} />
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold uppercase text-gray-700 dark:text-gray-400">
          section
        </p>
        <Button className="justify-start gap-2 px-4" size="lg">
          <HiHome className="text-base" />
          Home
        </Button>
        <Button variant="ghost" className="justify-start gap-2 px-4" size="lg">
          <HiOutlineMegaphone className="text-base" />
          Announcements
        </Button>
      </div>
      <div className="mt-auto flex w-full flex-col gap-3">
        <Button variant="outline" className="flex w-full gap-2" asChild>
          <Link href="/">
            <HiArrowUturnLeft />
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

export default function Sidebar() {
  return (
    <div className="row-span-2 hidden h-full w-[270px] flex-col gap-6 bg-gray-50 p-5 lg:flex dark:bg-gray-900">
      <SidebarItems />
    </div>
  );
}

export function SidebarDrawerButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <HiBars3 />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex w-[270px] flex-col gap-6 bg-gray-50 p-5 dark:bg-gray-900 "
      >
        <SidebarItems />
      </SheetContent>
    </Sheet>
  );
}
