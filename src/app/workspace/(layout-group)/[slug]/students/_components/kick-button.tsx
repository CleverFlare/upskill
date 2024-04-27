import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { HiOutlineBackspace } from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

export default function KickButton({ id }: { id: string }) {
  const router = useRouter();
  const { mutate, isPending } = api.user.deleteCourseStudents.useMutation({
    onSuccess: () => {
      router.push("?");
      router.refresh();
    },
  });

  const params: { slug: string } = useParams();

  const { data: session } = useSession();

  return (
    <Button
      size="icon"
      variant="outline"
      className="text-destructive hover:text-destructive"
      onClick={() =>
        mutate({
          students: [id],
          courseId: params.slug,
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
