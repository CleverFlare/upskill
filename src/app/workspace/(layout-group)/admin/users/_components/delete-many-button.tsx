import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

export default function DeleteManyButton({
  ids,
  onSuccess,
}: {
  ids: string[];
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const { mutate, isPending } = api.user.deleteUsers.useMutation({
    onSuccess: () => {
      router.push("?");
      router.refresh();
      !!onSuccess && onSuccess();
    },
  });

  const { data: session } = useSession();

  return (
    <Button
      onClick={() =>
        mutate({
          users: ids as [string, ...string[]],
          userId: session!.user.id,
        })
      }
      disabled={!ids.length || isPending}
      variant="outline"
      className="text-destructive hover:text-destructive"
    >
      {!isPending && <HiOutlineTrash className="me-2 text-base" />}
      {isPending && <LuLoader2 className="me-2 animate-spin text-base" />}
      Delete
    </Button>
  );
}
