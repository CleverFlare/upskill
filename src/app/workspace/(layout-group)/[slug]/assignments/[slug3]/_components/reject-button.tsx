import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { HiOutlineBackspace } from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

export default function RejectButton({ id }: { id: string }) {
  const router = useRouter();
  const { mutate, isPending } = api.course.rejectSubmission.useMutation({
    onSuccess: () => {
      router.push("?");
      router.refresh();
    },
  });

  const params: { slug3: string } = useParams();

  const { data: session } = useSession();

  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={() =>
        mutate({
          ids: [id],
          assignmentId: params.slug3,
          userId: session!.user.id,
        })
      }
      disabled={isPending}
    >
      {!isPending && <HiOutlineBackspace className="text-base" />}
      {isPending && <LuLoader2 className="animate-spin text-base" />}
    </Button>
  );
}
