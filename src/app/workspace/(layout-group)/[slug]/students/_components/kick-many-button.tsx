import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { HiOutlineBackspace } from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

export default function KickManyButton({
  ids,
  onSuccess,
}: {
  ids: string[];
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const { mutate, isPending } = api.user.deleteCourseStudents.useMutation({
    onSuccess: () => {
      router.push("?");
      router.refresh();
      !!onSuccess && onSuccess();
    },
  });

  const params: { slug: string } = useParams();
  const { data: session } = useSession();

  return (
    <Button
      onClick={() =>
        mutate({
          students: ids as [string, ...string[]],
          courseId: params.slug,
          userId: session!.user.id,
        })
      }
      disabled={!ids.length || isPending}
      variant="outline"
      className="text-destructive hover:text-destructive"
    >
      {!isPending && <HiOutlineBackspace className="me-2 text-base" />}
      {isPending && <LuLoader2 className="me-2 animate-spin text-base" />}
      Kick Out Selected
    </Button>
  );
}
