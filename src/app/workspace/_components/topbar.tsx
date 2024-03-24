import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function Topbar() {
  return (
    <div className="col-end-3 row-start-1 flex w-full justify-between px-4 py-4">
      <form className="relative w-full max-w-[300px]">
        <HiMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <Input placeholder="Search..." className="ps-8" />
      </form>
      <Avatar>
        <AvatarImage />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
    </div>
  );
}
