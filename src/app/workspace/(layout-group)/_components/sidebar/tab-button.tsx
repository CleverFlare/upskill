import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { type Tab } from "../tabs";
import { type Channel } from "pusher-js";
import {
  notifications as courseNotifications,
  type CourseNotification,
} from "@/data/notifications";
import { useAtom } from "jotai";

export default function TabButton({
  uncheckedIcon,
  checkedIcon,
  isAdmin,
  name,
  activeOn,
  notificationsName,
  href,
}: Tab & {
  channel?: Channel;
}) {
  const [checked, setChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const params: { slug: string } = useParams();

  const [storedNotifications, setStoredNotifications] =
    useAtom(courseNotifications);

  let notifications: Record<string, number> | undefined;

  if (storedNotifications.hasOwnProperty(params.slug))
    notifications = storedNotifications[params.slug];

  function handleSetNotifications(
    name: keyof CourseNotification,
    value: number,
  ) {
    setStoredNotifications((prev) => {
      const current: CourseNotification =
        prev[params?.slug] ?? ({} as CourseNotification);

      current[name] = value;

      return { ...prev, [name]: current };
    });
  }

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
    if (activeOn) {
      for (const activePath of activeOn)
        if (activePath instanceof RegExp && activePath.test(path))
          setChecked(true);
        else if (typeof activePath === "string" && path === activePath)
          setChecked(true);
    } else if (path === currentPath) {
      setChecked(true);
      if (notificationsName) handleSetNotifications(notificationsName, 0);
    } else setChecked(false);

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
        {!!notifications?.[String(notificationsName)] &&
          path !== currentPath && (
            <Badge
              variant="destructive"
              className="pointer-events-none ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
            >
              {notifications[notificationsName!]}
            </Badge>
          )}
      </Link>
    </Button>
  );
}
