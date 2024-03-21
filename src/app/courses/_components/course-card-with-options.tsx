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
import Link from "next/link";
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
  return (
    <div className="group relative aspect-video h-full w-full">
      <CourseCard href={href} thumbnailUrl={thumbnailUrl}>
        {children}
      </CourseCard>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100"
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
          <DropdownMenuItem className="flex gap-2">
            <HiTrash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
