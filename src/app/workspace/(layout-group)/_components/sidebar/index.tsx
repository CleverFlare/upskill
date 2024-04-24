import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarItems from "./sidebar-items";
import { Button } from "@/components/ui/button";
import { HiBars3 } from "react-icons/hi2";
import { headers } from "next/headers";
import { db } from "@/server/db";

async function ProgressInjectedSidebarItems() {
  const headersList = headers();

  const pathname =
    headersList.get("referer")?.replace(/(https|http):\/\/(.*?)\//g, "") ?? "";

  const pathnameArray = pathname.split("/");

  const slug = pathnameArray[1];

  console.log(slug);

  let unlocked = 0;

  const classes =
    slug !== "admin"
      ? await db.class.findMany({ where: { courseId: slug } })
      : [];

  classes.map(({ locked: isLocked }) => {
    if (isLocked) unlocked += 1;
  });

  const progress = Math.ceil(
    ((classes.length - unlocked) / classes.length) * 100,
  );

  return <SidebarItems progress={classes.length ? progress : 0} />;
}

export default function () {
  return (
    <div className="row-span-2 hidden h-full w-[270px] flex-col gap-6 bg-gray-50 p-5 lg:flex dark:bg-gray-900">
      <ProgressInjectedSidebarItems />
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
        forceMount
      >
        <ProgressInjectedSidebarItems />
      </SheetContent>
    </Sheet>
  );
}
