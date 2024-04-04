import { type ComponentProps } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export interface TeamMemberCardProps extends ComponentProps<"div"> {
  image?: string;
  name: string;
  role: string;
}

export default function TeamMemberCard({
  image,
  name,
  role,
  ...props
}: TeamMemberCardProps) {
  const splitName = name.split(" ");
  const firstName = splitName[0];
  const lastName = splitName[1];
  return (
    <div className="flex w-[163px] flex-col items-center gap-2" {...props}>
      <Avatar className="size-[64px]">
        <AvatarImage src={image} className="object-cover" />
        <AvatarFallback>
          {firstName?.[0]?.toUpperCase() ?? "A"}
          {lastName?.[0]?.toUpperCase() ?? "V"}
        </AvatarFallback>
      </Avatar>
      <p className="w-full truncate text-center font-bold">{name}</p>
      <p className="rounded-full border border-gray-200 px-[10px] py-[2px] text-xs font-semibold dark:border-gray-700">
        {role}
      </p>
    </div>
  );
}
