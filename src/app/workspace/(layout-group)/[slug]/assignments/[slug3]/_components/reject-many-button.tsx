import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useParams, useRouter } from "next/navigation";
import { HiOutlineBackspace } from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

export default function RejectManyButton({
  ids,
  onSuccess,
}: {
  ids: string[];
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const { mutate, isPending } = api.course.rejectSubmission.useMutation({
    onSuccess: () => {
      router.push("?");
      router.refresh();
      !!onSuccess && onSuccess();
    },
  });

  const params: { slug3: string } = useParams();

  return (
    <Button
      onClick={() =>
        mutate({
          ids: ids as [string, ...string[]],
          assignmentId: params.slug3,
        })
      }
      disabled={!ids.length || isPending}
      variant="destructive"
    >
      {!isPending && <HiOutlineBackspace className="me-2 text-base" />}
      {isPending && <LuLoader2 className="me-2 animate-spin text-base" />}
      Reject Selected
    </Button>
  );
}
