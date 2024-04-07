import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import { type ReactNode, type ComponentProps } from "react";
import { HiOutlineMegaphone } from "react-icons/hi2";

export interface AnnouncementProps extends ComponentProps<"div"> {
  title: string;
  children: ReactNode | string;
  image?: string;
  createdAt: string;
}

export default function Announcement({
  title,
  image,
  children,
  className,
  createdAt,
  ...props
}: AnnouncementProps) {
  return (
    <div
      className={cn(
        "flex h-max w-full flex-col gap-3 rounded-lg border-s-4 border-yellow-300 bg-yellow-50 p-5",
        className,
      )}
      {...props}
    >
      <div className="flex gap-4">
        <HiOutlineMegaphone className="text-6xl text-yellow-500" />
        <div className="flex flex-col">
          <p className="text-xl font-bold">{title}</p>
          <p className="text-gray-500">{children}</p>
        </div>
      </div>
      {!!image && (
        <Image
          src={image}
          alt="image"
          width={800}
          height={800}
          className="w-[800px] rounded-lg object-cover"
        />
      )}
      <div className="flex justify-end">
        <p className="text-sm text-gray-500">{format(createdAt, "PPp")}</p>
      </div>
    </div>
  );
}
