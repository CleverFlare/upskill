import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

export default function AcceptButton({ id }: { id: string }) {
  const router = useRouter();
  const { mutate, isPending } = api.user.acceptInstructors.useMutation({
    onSuccess: () => {
      router.push("?");
      router.refresh();
    },
  });
  return (
    <Button size="icon" onClick={() => mutate([id])} disabled={isPending}>
      {!isPending && <HiOutlineCheckCircle className="text-base" />}
      {isPending && <LuLoader2 className="animate-spin text-base" />}
    </Button>
  );
}
