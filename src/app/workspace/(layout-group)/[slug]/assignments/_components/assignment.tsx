import Markdown from "react-markdown";
import { components } from "./components";
import { format } from "date-fns";
import { HiOutlineClock, HiOutlineUserGroup } from "react-icons/hi2";
import SubmitForm from "./submit-form";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DeleteButton from "./delete-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface AssignmentProps {
  id: string;
  title: string;
  createdAt: string;
  content: string;
  dueDate: string;
  isSubmitted?: boolean;
  isInstructor?: boolean;
  hideSubmitForm?: boolean;
}

export default function Assignment({
  title,
  createdAt,
  content,
  dueDate,
  id,
  isSubmitted = false,
  isInstructor,
  hideSubmitForm,
}: AssignmentProps) {
  const isDue = new Date() < new Date(dueDate);
  return (
    <div className="group relative flex flex-col gap-2 border-b pb-4">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-sm text-gray-500">{format(createdAt, "PPp")}</p>
      <div className="flex flex-col gap-2">
        <Markdown components={components}>{content}</Markdown>
      </div>
      <div className="flex justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p
                className={cn(
                  "flex items-center text-base",
                  isSubmitted
                    ? "text-green-500"
                    : isDue
                      ? "text-gray-500"
                      : "text-destructive",
                )}
              >
                <HiOutlineClock
                  className={cn(
                    "me-2 text-xl",
                    isSubmitted
                      ? "text-green-500"
                      : isDue
                        ? "text-gray-500"
                        : "text-destructive",
                  )}
                />
                {format(dueDate, "PPp")}
              </p>
            </TooltipTrigger>
            <TooltipContent>Deadline</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {!isSubmitted && isDue && !hideSubmitForm && <SubmitForm id={id} />}
      </div>
      {isInstructor && (
        <div className="absolute right-2 top-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button variant="outline" size="icon" asChild>
            <Link href={`assignments/${id}`}>
              <HiOutlineUserGroup />
            </Link>
          </Button>
          <DeleteButton id={id} />
        </div>
      )}
    </div>
  );
}
