import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

export default function AcceptManyButton({
  ids,
  onSuccess,
}: {
  ids: string[];
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate, isPending } = api.user.acceptInstructors.useMutation({
    onSuccess: () => {
      router.push("?");
      router.refresh();
      !!onSuccess && onSuccess();
    },
  });
  return (
    <Button
      onClick={() =>
        mutate({
          instructors: ids as [string, ...string[]],
          userId: session!.user.id,
        })
      }
      disabled={!ids.length || isPending}
    >
      {!isPending && <HiOutlineCheckCircle className="me-2 text-base" />}
      {isPending && <LuLoader2 className="me-2 animate-spin text-base" />}
      Accept
    </Button>
  );
}
