"use client";
import CourseCard, { type CourseCardProps } from "@/components/course-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiEllipsisVertical, HiPencil, HiTrash } from "react-icons/hi2";

interface CourseCardWithActionsProps extends CourseCardProps {
  id: string;
}

export default function CourseCardWithActions({
  href,
  children,
  thumbnailUrl,
  id,
}: CourseCardWithActionsProps) {
  const [deleted, setDeleted] = useState<boolean>(false);
  const router = useRouter();
  const { mutate } = api.course.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  async function handleDeleteCourse() {
    mutate({ id });
    setDeleted(true);
  }

  return (
    <div
      className={cn(
        "group relative aspect-video h-full w-full",
        deleted ? "pointer-events-none opacity-50" : "",
      )}
    >
      <CourseCard href={href} thumbnailUrl={thumbnailUrl}>
        {children}
      </CourseCard>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100"
            disabled={deleted}
          >
            <HiEllipsisVertical className="text-xl" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex gap-2" asChild>
            <Link href={`/courses/edit?id=${id}`}>
              <HiPencil />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2"
            onClick={() => handleDeleteCourse()}
          >
            <HiTrash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
