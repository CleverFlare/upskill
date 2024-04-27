import { format } from "date-fns";
import Markdown from "react-markdown";
import { components } from "../../../[slug]/assignments/_components/components";
import { Button } from "@/components/ui/button";
import { HiOutlineTrash } from "react-icons/hi2";

interface LogProps {
  username: string;
  event: string;
  createdAt: Date;
  description: string;
}

export default function Log({
  username,
  event,
  createdAt,
  description,
}: LogProps) {
  return (
    <div className="flex flex-col gap-1 border-l-4 border-border p-2 hover:bg-muted">
      <div className="flex gap-2">
        <p className="rounded-sm bg-muted-foreground/15 px-2 py-1 text-sm text-muted-foreground">
          {username}
        </p>
        <p className="rounded-full bg-primary px-2 py-1 text-sm text-white">
          {event}
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        {format(createdAt, "PPp")}
      </p>
      <div className="flex flex-col gap-1">
        <Markdown components={components}>{description}</Markdown>
      </div>
    </div>
  );
}
