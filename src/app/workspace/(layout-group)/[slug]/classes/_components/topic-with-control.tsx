"use client";
import Topic, { type TopicProps } from "@/components/topic";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useParams, useRouter } from "next/navigation";
import {
  HiOutlineLockClosed,
  HiOutlineLockOpen,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

interface TopicWithControlsProps extends TopicProps {
  id: string;
  hideLock?: boolean;
}

export default function TopicWithControls({
  id,
  locked,
  hideLock,
  ...props
}: TopicWithControlsProps) {
  const router = useRouter();
  function handleSuccess() {
    router.refresh();
  }
  const { mutate: mutateDelete, isPending: isDeletePending } =
    api.course.deleteClass.useMutation({ onSuccess: handleSuccess });
  const { mutate: mutateLock, isPending: isLockPending } =
    api.course.toggleClassLock.useMutation({ onSuccess: handleSuccess });
  const params: { slug: string } = useParams();
  return (
    <div className="group relative flex w-full items-center">
      <Topic {...props} className="w-full" />
      <div className="absolute right-1 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        {!hideLock && (
          <Button
            variant="outline"
            size="icon"
            className="size-7"
            onClick={() =>
              mutateLock({ locked: !locked, id, courseId: params.slug })
            }
            disabled={isLockPending}
          >
            {isLockPending && <LuLoader2 className="animate-spin" />}
            {!isLockPending &&
              (locked ? <HiOutlineLockClosed /> : <HiOutlineLockOpen />)}
          </Button>
        )}
        <Button
          variant="destructive"
          size="icon"
          className="size-7"
          disabled={isDeletePending}
          onClick={() => mutateDelete({ id })}
        >
          {isDeletePending && <LuLoader2 className="animate-spin" />}
          {!isDeletePending && <HiOutlineTrash />}
        </Button>
      </div>
    </div>
  );
}
// <Button variant="outline" size="icon" className="size-7">
//   <HiOutlinePencil />
// </Button>
