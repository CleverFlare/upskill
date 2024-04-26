import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const { mutate, isPending } = api.quiz.delete.useMutation({
    onSuccess: () => {
      router.push("?");
      router.refresh();
    },
  });

  return (
    <Button
      size="icon"
      variant="destructive"
      onClick={() => mutate({ id: id })}
      disabled={isPending}
    >
      {!isPending && <HiOutlineTrash className="text-base" />}
      {isPending && <LuLoader2 className="animate-spin text-base" />}
    </Button>
  );
}
