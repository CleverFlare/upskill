"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useState, useEffect } from "react";
import {
  HiArrowRightOnRectangle,
  HiArrowUturnLeft,
  HiBars3,
} from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";
import tabs from "./tabs";
import { Skeleton } from "@/components/ui/skeleton";

interface TabButtonProps {
  checkedIcon: ReactNode;
  uncheckedIcon: ReactNode;
  name: string;
  href: string;
  isAdmin?: boolean;
}

function TabButton({
  uncheckedIcon,
  checkedIcon,
  isAdmin,
  name,
  href,
}: TabButtonProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const path: string = usePathname();
  const pathArray = path
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .split("/");

  const currentPath = `/${pathArray[0]}/${pathArray[1]}${href.replace(
    /\/+$/g,
    "",
  )}`;

  useEffect(() => {
    if (path === currentPath) setChecked(true);
    else setChecked(false);

    setIsLoading(false);
  }, [path]);

  if (isAdmin && pathArray[1] !== "admin") return;
  if (!isAdmin && pathArray[1] === "admin") return;

  if (isLoading) return <Skeleton className="h-10 w-full rounded-lg" />;

  return (
    <Button
      variant={checked ? "default" : "ghost"}
      className="justify-start gap-2 px-4"
      size="lg"
      asChild
    >
      <Link href={currentPath}>
        {checked && checkedIcon}
        {!checked && uncheckedIcon}
        {name}
      </Link>
    </Button>
  );
}

function SidebarItems() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  async function handleSignOut() {
    setIsLoading(true);
    await signOut({ redirect: false });
    router.refresh();
  }
  const path = usePathname();
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
        {!path && "Loading..."}
        {!!path && tabs.map((tab) => <TabButton {...tab} />)}
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
