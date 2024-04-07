"use client";
import Announcement, {
  type AnnouncementProps,
} from "@/components/announcement";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiTrash } from "react-icons/hi2";

export default function AnnouncementWithActions({
  id,
  ...props
}: AnnouncementProps & { id: string }) {
  const [deleted, setDeleted] = useState<boolean>(false);
  const router = useRouter();
  const { mutate, isLoading } = api.course.deleteAnnouncement.useMutation({
    onSuccess: () => {
      setDeleted(true);
      router.refresh();
    },
  });

  function handleDelete() {
    mutate({ id });
  }

  return (
    <>
      {!deleted && (
        <div
          className={cn(
            "group relative",
            isLoading ? "pointer-events-none opacity-50" : "",
          )}
        >
          <Announcement {...props} />
          <Button
            variant="destructive"
            size="icon"
            className="absolute right-5 top-5 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={() => handleDelete()}
          >
            <HiTrash className="text-base" />
          </Button>
        </div>
      )}
    </>
  );
}
