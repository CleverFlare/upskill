import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { getServerAuthSession } from "@/server/auth";
import EclipseButton from "@/app/_components/_parts/eclipse-button";
import { SidebarDrawerButton } from "./sidebar";

export default async function Topbar() {
  const session = await getServerAuthSession();
  return (
    <div className="col-end-3 row-start-1 flex w-full items-center gap-4 px-4 py-4">
      <div className="flex flex-1 items-center gap-4">
        <SidebarDrawerButton />
        <form className="relative w-full max-w-[300px]">
          <HiMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <Input placeholder="Search..." className="w-full ps-8" />
        </form>
      </div>
      <EclipseButton />
      <Avatar className="h-9 w-9">
        <AvatarImage src={session?.user.image} />
        <AvatarFallback>
          {session?.user.firstName[0]?.toUpperCase() ?? "A"}
          {session?.user.firstName[1]?.toUpperCase() ?? "V"}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
