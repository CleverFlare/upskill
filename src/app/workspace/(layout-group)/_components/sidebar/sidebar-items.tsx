"use client";
import { Progress } from "@/components/ui/progress";
import { signOut, useSession } from "next-auth/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import tabs, { pusher } from "../tabs";
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
import { useAtom } from "jotai";
import {
  type CourseNotification,
  notifications as courseNotifications,
} from "@/data/notifications";

export default function SidebarItems({ progress }: { progress: number }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const params: Record<string, string | string[]> & { slug: string } =
    useParams();

  const [_, setStoredNotifications] = useAtom(courseNotifications);

  const handleAddNotifications = useCallback(
    (name: keyof CourseNotification, value: number) => {
      setStoredNotifications((prev: Record<string, CourseNotification>) => {
        const current: CourseNotification =
          prev[params?.slug] ?? ({} as CourseNotification);

        if (current[name]) current[name] += value;
        else current[name] = value;

        return { ...prev, [params?.slug]: current };
      });
    },
    [],
  );

  const router = useRouter();

  async function handleSignOut() {
    setIsLoading(true);
    await signOut({ redirect: false });
    router.refresh();
  }

  const path = usePathname();
  const { data: session } = useSession();

  const pathArray = path
    .trim()
    .replace(/^\/+|\/$/g, "")
    .split("/");

  const isAdminPath = pathArray[1] === "admin";

  const isAdmin = session?.user.role === "admin";

  const channel = useMemo(
    () => (params?.slug ? pusher.subscribe(params.slug) : undefined),
    [isAdminPath],
  );

  useEffect(() => {
    if (!!channel)
      channel.bind(
        "notifications",
        (data: { name: string; notifications: number }) => {
          handleAddNotifications(data.name, data.notifications);
          console.log(data.notifications);
        },
      );
  }, [channel]);

  return (
    <>
      <Logo />
      {!isAdminPath && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold uppercase text-gray-700 dark:text-gray-400">
            progress
          </p>
          <Progress value={progress} />
        </div>
      )}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold uppercase text-gray-700 dark:text-gray-400">
          section
        </p>
        {tabs.map((tab) => (
          <TabButton {...tab} channel={channel} />
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
