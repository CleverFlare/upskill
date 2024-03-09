import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export default function TeamMemberCard() {
  return (
    <div className="flex w-[163px] flex-col items-center gap-2">
      <Avatar className="size-[64px]">
        <AvatarImage src="/avatars/avatar.png" />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <p className="w-full truncate text-center font-bold">Eng. Mustafa Ali</p>
      <p className="rounded-full border border-gray-200 px-[10px] py-[2px] text-xs font-semibold dark:border-gray-700">
        Instructor
      </p>
    </div>
  );
}
