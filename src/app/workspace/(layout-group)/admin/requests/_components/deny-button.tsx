import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
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
  return (
    <Button
      size="icon"
      variant="outline"
      className="text-destructive hover:text-destructive"
      onClick={() => mutate([id])}
      disabled={isPending}
    >
      {!isPending && <HiOutlineXCircle className="text-base" />}
      {isPending && <LuLoader2 className="animate-spin text-base" />}
    </Button>
  );
}