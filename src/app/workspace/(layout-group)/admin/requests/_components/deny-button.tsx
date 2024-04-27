import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HiOutlineXCircle } from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

export default function DenyButton({ id }: { id: string }) {
  const router = useRouter();
  const { mutate, isPending } = api.user.deleteUsers.useMutation({
    onSuccess: () => {
      router.push("?");
      router.refresh();
    },
  });

  const { data: session } = useSession();

  return (
    <Button
      size="icon"
      variant="outline"
      className="text-destructive hover:text-destructive"
      onClick={() => mutate({ users: [id], userId: session!.user.id })}
      disabled={isPending}
    >
      {!isPending && <HiOutlineXCircle className="text-base" />}
      {isPending && <LuLoader2 className="animate-spin text-base" />}
    </Button>
  );
}
