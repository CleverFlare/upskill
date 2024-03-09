import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ComponentProps } from "react";

interface CourseCardProps extends ComponentProps<"div"> {
  thumbnailUrl?: string;
}

export default function CourseCard({
  children,
  className,
  thumbnailUrl = "/course thumbnail.jpg",
  ...props
}: CourseCardProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <Image
        src={thumbnailUrl}
        alt="course thumbnail"
        width={1000}
        height={1000}
        className="aspect-video w-full rounded-md"
      />
      <p className="w-full font-bold">{children}</p>
    </div>
  );
}
