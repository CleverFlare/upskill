import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarItems from "./sidebar-items";
import { Button } from "@/components/ui/button";
import { HiBars3 } from "react-icons/hi2";

export default function () {
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
        forceMount
      >
        <SidebarItems />
      </SheetContent>
    </Sheet>
  );
}
