import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ComponentProps } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface TechnologyCardProps extends ComponentProps<"div"> {
  logoUrl: string;
  name: string;
}

export default function TechnologyCard({
  logoUrl,
  name,
  className,
  ...props
}: TechnologyCardProps) {
  name;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={cn(
              "flex h-full max-h-24 w-full max-w-24 snap-center items-center justify-center rounded-lg bg-gray-50 p-3 shadow dark:bg-gray-900",
              className,
            )}
            {...props}
          >
            <Image
              src={logoUrl}
              alt="Technology Image"
              width={76}
              height={76}
              className="max-h-[76px] max-w-[76px]"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
