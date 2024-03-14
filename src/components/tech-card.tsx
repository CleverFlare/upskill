import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ComponentProps, MouseEvent } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { HiTrash } from "react-icons/hi2";

interface TechnologyCardProps extends ComponentProps<"div"> {
  logoUrl: string;
  name: string;
  onDelete?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function TechnologyCard({
  logoUrl,
  name,
  className,
  onDelete,
  ...props
}: TechnologyCardProps) {
  name;
  return (
    <div className="group relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className={cn(
                " flex h-screen max-h-24 w-full max-w-24 snap-center items-center justify-center rounded-lg bg-gray-50 p-3 shadow dark:bg-gray-900",
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
      {Boolean(onDelete) && (
        <Button
          variant="outline"
          className="absolute right-1 top-1 text-destructive opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
          size="icon"
          onClick={onDelete}
        >
          <HiTrash />
        </Button>
      )}
    </div>
  );
}
