import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ComponentProps } from "react";

export default function CourseCard({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <Image
        src="/course thumbnail.jpg"
        alt="course thumbnail"
        width={1000}
        height={1000}
        className="aspect-video w-full rounded-md"
      />
      <p className="w-full font-bold">{children}</p>
    </div>
  );
}
