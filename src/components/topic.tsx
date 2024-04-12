"use client";
import { HiChevronDown, HiChevronUp, HiHashtag } from "react-icons/hi2";
import { Button, type ButtonProps } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TopicProps extends ButtonProps {
  locked?: boolean;
  title: string;
}

export default function Topic({
  children,
  className,
  locked,
  variant = "ghost",
  title,
  ...props
}: TopicProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Collapsible
      open={open}
      onOpenChange={(val: boolean) => setOpen(val)}
      className="flex flex-col gap-4"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant={variant}
          className={cn(
            "flex w-full justify-between bg-transparent p-0 hover:bg-transparent",
            locked ? "opacity-50" : "",
            className,
          )}
          {...props}
        >
          <p className="flex items-center text-xl font-bold">
            <HiHashtag className="me-2 text-xl" />
            {title}
          </p>
          {open ? <HiChevronUp /> : <HiChevronDown />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent
        className={cn("ms-10 flex-col gap-2", open ? "flex" : "hidden")}
      >
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
