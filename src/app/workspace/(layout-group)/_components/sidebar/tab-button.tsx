import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

interface TabButtonProps {
  checkedIcon: ReactNode;
  uncheckedIcon: ReactNode;
  name: string;
  href: string;
  isAdmin?: boolean;
  activeOn?: string[];
}

export default function TabButton({
  uncheckedIcon,
  checkedIcon,
  isAdmin,
  name,
  activeOn,
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
    if (path === currentPath || (activeOn && activeOn.includes(path)))
      setChecked(true);
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
