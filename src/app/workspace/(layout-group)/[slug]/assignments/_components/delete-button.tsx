"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const { mutate, isPending } = api.course.deleteAssignment.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const { data: session } = useSession();

  function handleDelete() {
    mutate({ id, userId: session!.user.id });
  }
  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={() => handleDelete()}
      disabled={isPending}
    >
      {isPending && <LuLoader2 className="animate-spin text-base" />}
      {!isPending && <HiOutlineTrash className="text-base" />}
    </Button>
  );
}
